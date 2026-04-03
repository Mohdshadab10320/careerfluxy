import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { question, answer, course, mood } = await req.json();
    if (!question || !answer) {
      return new Response(JSON.stringify({ error: "question and answer are required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const systemPrompt = `You are an expert interview evaluator for ${course || "general"} interviews. 
Interviewer mood: ${mood || "friendly"}.

Evaluate the candidate's answer and return a JSON response using the provided tool.
Be specific, constructive, and actionable in your feedback.
Score from 1-10 based on: relevance, depth, clarity, confidence, and structure.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Question: "${question}"\n\nCandidate's Answer: "${answer}"\n\nEvaluate this answer.` },
        ],
        tools: [{
          type: "function",
          function: {
            name: "evaluate_interview_answer",
            description: "Evaluate an interview answer with score, feedback, and examples",
            parameters: {
              type: "object",
              properties: {
                score: { type: "number", description: "Score from 1 to 10" },
                rating: { type: "string", enum: ["weak", "average", "ideal"], description: "Overall rating" },
                feedback: { type: "string", description: "Detailed feedback on the answer" },
                mistakes: { type: "array", items: { type: "string" }, description: "List of mistakes or areas to improve" },
                weak_answer: { type: "string", description: "Example of a weak answer to this question" },
                average_answer: { type: "string", description: "Example of an average answer" },
                ideal_answer: { type: "string", description: "Example of an ideal answer" },
                suggestion: { type: "string", description: "AI suggestion for improvement" },
                skills: {
                  type: "object",
                  properties: {
                    communication: { type: "number", description: "Communication score 1-100" },
                    technical: { type: "number", description: "Technical knowledge score 1-100" },
                    confidence: { type: "number", description: "Confidence score 1-100" },
                    structure: { type: "number", description: "Answer structure score 1-100" },
                  },
                  required: ["communication", "technical", "confidence", "structure"],
                },
              },
              required: ["score", "rating", "feedback", "mistakes", "weak_answer", "average_answer", "ideal_answer", "suggestion", "skills"],
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "evaluate_interview_answer" } },
      }),
    });

    if (!response.ok) {
      const status = response.status;
      const text = await response.text();
      console.error("AI gateway error:", status, text);
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "AI evaluation failed" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall?.function?.arguments) {
      const evaluation = JSON.parse(toolCall.function.arguments);
      return new Response(JSON.stringify(evaluation), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "No evaluation returned" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("evaluate error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
