import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Map, Sparkles, Target, BookOpen, Calendar, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface MonthPlan {
  month: number;
  title: string;
  focus: string;
  weekly_tasks: string[];
  daily_routine: string;
  resources: string[];
  milestone: string;
}
interface Roadmap {
  overview: string;
  required_skills: string[];
  months: MonthPlan[];
}

const goals = ["IT / Software Developer", "Banking & Finance", "SSC / Govt Jobs", "Teaching", "Management / MBA", "Medical", "Diploma / Polytechnic", "Data Analyst", "Digital Marketing"];

const CareerRoadmap = () => {
  const { user } = useAuth();
  const [goal, setGoal] = useState(goals[0]);
  const [months, setMonths] = useState(3);
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from("career_roadmaps").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).maybeSingle()
      .then(({ data }) => { if (data) { setRoadmap(data.roadmap as any); setGoal(data.goal); setMonths(data.duration_months); } });
  }, [user]);

  const generate = async () => {
    setLoading(true); setRoadmap(null);
    try {
      const { data, error } = await supabase.functions.invoke("ai-features", { body: { action: "roadmap", payload: { goal, months } } });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setRoadmap(data);
      if (user) {
        await supabase.from("career_roadmaps").insert({ user_id: user.id, goal, duration_months: months, roadmap: data });
        await supabase.from("user_badges").insert({ user_id: user.id, badge_code: "roadmap_set" }).then(() => {});
      }
      toast.success("Your personalized roadmap is ready!");
    } catch (e: any) {
      toast.error(e.message || "Failed to generate roadmap");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3">
            <Map className="h-8 w-8 text-primary" /> AI Career <span className="gradient-text">Roadmap</span>
          </h1>
          <p className="text-muted-foreground mt-2">Get a personalized {months}-month plan with daily tasks, skills, and resources.</p>
        </motion.div>

        <div className="bg-card rounded-2xl border border-border p-6 mb-8 grid sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Career Goal</label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{goals.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Duration (months)</label>
            <Input type="number" min={1} max={12} value={months} onChange={e => setMonths(Number(e.target.value))} />
          </div>
          <Button onClick={generate} disabled={loading} className="gradient-bg border-0 text-primary-foreground">
            <Sparkles className="h-4 w-4 mr-2" /> {loading ? "Generating..." : "Generate Roadmap"}
          </Button>
        </div>

        {roadmap && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="font-semibold text-lg flex items-center gap-2 mb-2"><Target className="h-5 w-5 text-primary" /> Overview</h2>
              <p className="text-muted-foreground">{roadmap.overview}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {roadmap.required_skills.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
              </div>
            </div>

            {roadmap.months.map((m) => (
              <div key={m.month} className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-xl font-bold">Month {m.month}: {m.title}</h3>
                  <Badge className="gradient-bg border-0 text-primary-foreground">{m.focus}</Badge>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="text-sm font-semibold flex items-center gap-2 mb-2"><Calendar className="h-4 w-4" /> Weekly Tasks</h4>
                    <ul className="space-y-1">{m.weekly_tasks.map((t, i) => <li key={i} className="text-sm text-muted-foreground flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> {t}</li>)}</ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold flex items-center gap-2 mb-2"><BookOpen className="h-4 w-4" /> Resources</h4>
                    <ul className="space-y-1">{m.resources.map((r, i) => <li key={i} className="text-sm text-muted-foreground">• {r}</li>)}</ul>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-muted/50 text-sm"><strong>Daily routine:</strong> {m.daily_routine}</div>
                <div className="mt-2 p-3 rounded-lg bg-primary/10 text-sm"><strong>🎯 Milestone:</strong> {m.milestone}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CareerRoadmap;