import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, Send, Languages } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useVoiceRecorder } from "@/hooks/useInterviewTools";
import { toast } from "sonner";

const SpokenEnglish = () => {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [hindi, setHindi] = useState("");
  const [translation, setTranslation] = useState("");
  const [evalRes, setEvalRes] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { recording, transcript, startRecording, stopRecording, setTranscript } = useVoiceRecorder();

  const evaluate = async () => {
    const sentence = transcript || text;
    if (!sentence.trim()) return;
    setLoading(true); setEvalRes(null);
    try {
      const { data, error } = await supabase.functions.invoke("ai-features", { body: { action: "spoken_english", payload: { text: sentence } } });
      if (error || data?.error) throw new Error(data?.error || error?.message);
      setEvalRes(data);
      if (user && data.score >= 80) {
        await supabase.from("user_badges").insert({ user_id: user.id, badge_code: "english_pro" }).then(() => {});
      }
    } catch (e: any) { toast.error(e.message || "Failed"); }
    finally { setLoading(false); }
  };

  const translate = async () => {
    if (!hindi.trim()) return;
    setLoading(true); setTranslation("");
    try {
      const { data } = await supabase.functions.invoke("ai-features", { body: { action: "translate_hi_en", payload: { hindi } } });
      setTranslation(data?.english || "");
    } catch (e: any) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold flex items-center gap-3">
            <Languages className="h-8 w-8 text-primary" /> Spoken <span className="gradient-text">English Trainer</span>
          </h1>
          <p className="text-muted-foreground mt-2">Practice speaking, get pronunciation tips and Hindi → English translation.</p>
        </motion.div>

        <Tabs defaultValue="speak">
          <TabsList>
            <TabsTrigger value="speak">Speaking Practice</TabsTrigger>
            <TabsTrigger value="translate">Hindi → English</TabsTrigger>
          </TabsList>

          <TabsContent value="speak" className="space-y-4">
            <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
              <div className="flex gap-2">
                <Button variant={recording ? "destructive" : "outline"} onClick={() => recording ? stopRecording() : startRecording()}>
                  {recording ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                  {recording ? "Stop" : "Speak in English"}
                </Button>
              </div>
              <Textarea value={transcript || text} onChange={e => { setText(e.target.value); setTranscript(e.target.value); }} placeholder="Say something in English, or type here..." rows={4} />
              <Button onClick={evaluate} disabled={loading} className="gradient-bg border-0 text-primary-foreground">
                <Send className="h-4 w-4 mr-2" /> {loading ? "Evaluating..." : "Evaluate My English"}
              </Button>
            </div>

            {evalRes && (
              <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2"><span>Score</span><span>{evalRes.score}/100</span></div>
                  <Progress value={evalRes.score} />
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div><div className="font-semibold mb-1">Grammar</div><p className="text-muted-foreground">{evalRes.grammar}</p></div>
                  <div><div className="font-semibold mb-1">Pronunciation Tips</div><p className="text-muted-foreground">{evalRes.pronunciation_tips}</p></div>
                  <div><div className="font-semibold mb-1">Corrected Sentence</div><p className="text-primary">{evalRes.corrected}</p></div>
                  <div><div className="font-semibold mb-1">Hindi Translation</div><p className="text-muted-foreground">{evalRes.hindi_translation}</p></div>
                </div>
                <div className="p-3 rounded-lg bg-primary/10 text-sm"><strong>💡 Improvement:</strong> {evalRes.improvement}</div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="translate" className="space-y-4">
            <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
              <Textarea value={hindi} onChange={e => setHindi(e.target.value)} placeholder="हिंदी वाक्य लिखें..." rows={4} />
              <Button onClick={translate} disabled={loading} className="gradient-bg border-0 text-primary-foreground">
                <Send className="h-4 w-4 mr-2" /> {loading ? "Translating..." : "Translate to English"}
              </Button>
              {translation && <div className="p-4 rounded-lg bg-primary/10"><div className="text-xs font-semibold mb-1">English:</div><p>{translation}</p></div>}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default SpokenEnglish;