import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, Trophy, Send, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const today = () => new Date().toISOString().split("T")[0];

const DailyChallenge = () => {
  const { user, profile } = useAuth();
  const [challenge, setChallenge] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [attempt, setAttempt] = useState<any>(null);
  const [streak, setStreak] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [badges, setBadges] = useState<any[]>([]);
  const [myBadges, setMyBadges] = useState<string[]>([]);

  useEffect(() => { (async () => {
    setLoading(true);
    const date = today();
    let { data: ch } = await supabase.from("daily_challenges").select("*").eq("challenge_date", date).maybeSingle();
    if (!ch) {
      const { data: gen } = await supabase.functions.invoke("ai-features", { body: { action: "daily_question" } });
      if (gen && !gen.error) {
        const { data: inserted } = await supabase.from("daily_challenges").insert({ challenge_date: date, category: gen.category, question: gen.question, ideal_answer: gen.ideal_answer }).select().maybeSingle();
        ch = inserted;
      }
    }
    setChallenge(ch);
    if (user && ch) {
      const { data: at } = await supabase.from("user_daily_attempts").select("*").eq("user_id", user.id).eq("challenge_id", ch.id).maybeSingle();
      if (at) setAttempt(at);
      const { data: st } = await supabase.from("user_streaks").select("*").eq("user_id", user.id).maybeSingle();
      setStreak(st);
      const { data: ub } = await supabase.from("user_badges").select("badge_code").eq("user_id", user.id);
      setMyBadges((ub || []).map(b => b.badge_code));
    }
    const { data: lb } = await supabase.from("user_streaks").select("user_id, current_streak, best_streak, total_xp").order("total_xp", { ascending: false }).limit(20);
    setLeaderboard(lb || []);
    const { data: bs } = await supabase.from("badges").select("*");
    setBadges(bs || []);
    setLoading(false);
  })(); }, [user]);

  const submit = async () => {
    if (!user) { toast.error("Please log in"); return; }
    if (!answer.trim() || !challenge) return;
    setSubmitting(true);
    try {
      const { data: evalResult } = await supabase.functions.invoke("evaluate-answer", { body: { question: challenge.question, answer, course: "general", mood: "friendly" } });
      const score = (evalResult?.score || 5) * 10;
      const xp = score;
      const { data: at } = await supabase.from("user_daily_attempts").insert({ user_id: user.id, challenge_id: challenge.id, challenge_date: challenge.challenge_date, answer, score, feedback: evalResult }).select().maybeSingle();
      setAttempt(at);

      // Update streak
      const { data: st } = await supabase.from("user_streaks").select("*").eq("user_id", user.id).maybeSingle();
      const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
      const ystr = yesterday.toISOString().split("T")[0];
      let current = 1;
      let best = st?.best_streak || 0;
      if (st?.last_activity_date === ystr) current = (st.current_streak || 0) + 1;
      else if (st?.last_activity_date === today()) current = st.current_streak || 1;
      best = Math.max(best, current);
      const totalXp = (st?.total_xp || 0) + xp;
      if (st) {
        await supabase.from("user_streaks").update({ current_streak: current, best_streak: best, last_activity_date: today(), total_xp: totalXp, updated_at: new Date().toISOString() }).eq("user_id", user.id);
      } else {
        await supabase.from("user_streaks").insert({ user_id: user.id, current_streak: current, best_streak: best, last_activity_date: today(), total_xp: totalXp });
      }
      setStreak({ current_streak: current, best_streak: best, total_xp: totalXp });

      // Award badges
      const earn = async (code: string) => { if (!myBadges.includes(code)) { await supabase.from("user_badges").insert({ user_id: user.id, badge_code: code }); setMyBadges(p => [...p, code]); } };
      await earn("first_step");
      if (current >= 3) await earn("streak_3");
      if (current >= 7) await earn("streak_7");
      if (current >= 30) await earn("streak_30");

      toast.success(`+${xp} XP earned!`);
    } catch (e: any) { toast.error(e.message || "Failed"); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="font-display text-3xl md:text-4xl font-bold flex items-center gap-3">
            <Flame className="h-8 w-8 text-orange-500" /> Daily <span className="gradient-text">Challenge</span>
          </h1>
          <p className="text-muted-foreground mt-2">Answer one question every day. Build your streak. Climb the leaderboard.</p>
        </motion.div>

        {streak && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-card border border-border rounded-xl p-4 text-center"><div className="text-2xl font-bold text-orange-500">{streak.current_streak}🔥</div><div className="text-xs text-muted-foreground">Current Streak</div></div>
            <div className="bg-card border border-border rounded-xl p-4 text-center"><div className="text-2xl font-bold text-primary">{streak.best_streak}</div><div className="text-xs text-muted-foreground">Best Streak</div></div>
            <div className="bg-card border border-border rounded-xl p-4 text-center"><div className="text-2xl font-bold text-foreground">{streak.total_xp} XP</div><div className="text-xs text-muted-foreground">Total XP</div></div>
          </div>
        )}

        <Tabs defaultValue="today" className="space-y-6">
          <TabsList>
            <TabsTrigger value="today">Today's Question</TabsTrigger>
            <TabsTrigger value="leaderboard"><Trophy className="h-4 w-4 mr-1" /> Leaderboard</TabsTrigger>
            <TabsTrigger value="badges"><Award className="h-4 w-4 mr-1" /> Badges</TabsTrigger>
          </TabsList>

          <TabsContent value="today">
            {loading ? <p className="text-muted-foreground">Loading today's challenge...</p> : challenge ? (
              <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
                <Badge variant="secondary">{challenge.category}</Badge>
                <h2 className="text-xl font-semibold">{challenge.question}</h2>
                {attempt ? (
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                      <div className="text-sm font-semibold mb-1">Your Score: {attempt.score}/100</div>
                      <p className="text-sm text-muted-foreground">{attempt.feedback?.feedback}</p>
                    </div>
                    {challenge.ideal_answer && <div className="p-4 rounded-lg bg-muted/50"><div className="text-xs font-semibold mb-1">Ideal answer:</div><p className="text-sm">{challenge.ideal_answer}</p></div>}
                    <p className="text-xs text-muted-foreground">Come back tomorrow for a new question!</p>
                  </div>
                ) : (
                  <>
                    <Textarea value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Type your answer..." rows={5} />
                    <Button onClick={submit} disabled={submitting || !answer.trim()} className="gradient-bg border-0 text-primary-foreground">
                      <Send className="h-4 w-4 mr-2" /> {submitting ? "Evaluating..." : "Submit Answer"}
                    </Button>
                  </>
                )}
              </div>
            ) : <p>No challenge available. Try again later.</p>}
          </TabsContent>

          <TabsContent value="leaderboard">
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              {leaderboard.length === 0 ? <p className="p-6 text-muted-foreground">No rankings yet. Be the first!</p> : (
                <table className="w-full text-sm">
                  <thead className="bg-muted/50"><tr><th className="text-left p-3">Rank</th><th className="text-left p-3">User</th><th className="text-left p-3">Streak</th><th className="text-left p-3">Best</th><th className="text-left p-3">XP</th></tr></thead>
                  <tbody>
                    {leaderboard.map((row, i) => (
                      <tr key={row.user_id} className={`border-t border-border ${user?.id === row.user_id ? "bg-primary/10" : ""}`}>
                        <td className="p-3 font-semibold">#{i + 1}</td>
                        <td className="p-3">{user?.id === row.user_id ? (profile?.full_name || "You") : `User ${row.user_id.slice(0, 6)}`}</td>
                        <td className="p-3">{row.current_streak}🔥</td>
                        <td className="p-3">{row.best_streak}</td>
                        <td className="p-3 font-semibold">{row.total_xp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </TabsContent>

          <TabsContent value="badges">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {badges.map(b => {
                const earned = myBadges.includes(b.code);
                return (
                  <div key={b.code} className={`p-5 rounded-2xl border ${earned ? "border-primary bg-primary/5" : "border-border bg-card opacity-60"}`}>
                    <div className="text-4xl mb-2">{b.icon}</div>
                    <div className="font-semibold">{b.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{b.description}</div>
                    {earned && <Badge className="mt-3 gradient-bg border-0 text-primary-foreground">Earned</Badge>}
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default DailyChallenge;