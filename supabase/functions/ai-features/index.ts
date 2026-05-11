import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

async function callAI(systemPrompt: string, userPrompt: string, tool: any) {
  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      tools: [{ type: "function", function: tool }],
      tool_choice: { type: "function", function: { name: tool.name } },
    }),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`AI gateway ${response.status}: ${text}`);
  }
  const data = await response.json();
  const args = data.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
  if (!args) throw new Error("No structured response");
  return JSON.parse(args);
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");
    const { action, payload } = await req.json();

    if (action === "roadmap") {
      const { goal, months = 3 } = payload || {};
      const result = await callAI(
        `You are an expert career coach. Generate a ${months}-month roadmap for someone targeting "${goal}". Be specific and actionable for an Indian student/professional.`,
        `Create a ${months}-month roadmap for: ${goal}`,
        {
          name: "create_roadmap",
          description: "Create a detailed career roadmap",
          parameters: {
            type: "object",
            properties: {
              overview: { type: "string" },
              required_skills: { type: "array", items: { type: "string" } },
              months: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    month: { type: "number" },
                    title: { type: "string" },
                    focus: { type: "string" },
                    weekly_tasks: { type: "array", items: { type: "string" } },
                    daily_routine: { type: "string" },
                    resources: { type: "array", items: { type: "string" } },
                    milestone: { type: "string" },
                  },
                  required: ["month", "title", "focus", "weekly_tasks", "daily_routine", "resources", "milestone"],
                },
              },
            },
            required: ["overview", "required_skills", "months"],
          },
        }
      );
      return new Response(JSON.stringify(result), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "daily_question") {
      const result = await callAI(
        `Generate ONE concise daily interview challenge question. Mix categories across days (HR, behavioral, aptitude, technical, communication).`,
        `Today's date: ${new Date().toISOString().split("T")[0]}. Generate a fresh interview question.`,
        {
          name: "daily_q",
          description: "Daily interview question",
          parameters: {
            type: "object",
            properties: {
              category: { type: "string" },
              question: { type: "string" },
              ideal_answer: { type: "string" },
            },
            required: ["category", "question", "ideal_answer"],
          },
        }
      );
      return new Response(JSON.stringify(result), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "spoken_english") {
      const { text } = payload || {};
      const result = await callAI(
        `You are a spoken English coach for Hindi-speaking learners. Evaluate the user's English sentence(s). Be encouraging.`,
        `Evaluate: "${text}"`,
        {
          name: "spoken_eval",
          description: "Evaluate spoken English",
          parameters: {
            type: "object",
            properties: {
              score: { type: "number", description: "0-100" },
              grammar: { type: "string" },
              pronunciation_tips: { type: "string" },
              corrected: { type: "string" },
              hindi_translation: { type: "string" },
              improvement: { type: "string" },
            },
            required: ["score", "grammar", "pronunciation_tips", "corrected", "hindi_translation", "improvement"],
          },
        }
      );
      return new Response(JSON.stringify(result), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "translate_hi_en") {
      const { hindi } = payload || {};
      const result = await callAI(
        `Translate Hindi sentences to natural English. Provide the English translation only.`,
        `Hindi: ${hindi}`,
        {
          name: "translate",
          description: "Translate Hindi to English",
          parameters: {
            type: "object",
            properties: { english: { type: "string" } },
            required: ["english"],
          },
        }
      );
      return new Response(JSON.stringify(result), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("ai-features error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});