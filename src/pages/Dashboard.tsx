import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BarChart3, Trophy, Target, TrendingUp, Flame, Download, Award, BookOpen, Brain, Mic } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { user, profile } = useAuth();
  const [sessions, setSessions] = useState<any[]>([]);
  const [testResults, setTestResults] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    // Fetch interview sessions
    supabase.from("interview_sessions").select("*").eq("user_id", user.id)
      .order("created_at", { ascending: false }).limit(50)
      .then(({ data }) => { if (data) setSessions(data); });
    // Fetch test results
    supabase.from("test_results").select("*").eq("user_id", user.id)
      .order("created_at", { ascending: false }).limit(50)
      .then(({ data }) => { if (data) setTestResults(data); });
  }, [user]);

  const totalInterviews = sessions.length;
  const avgScore = sessions.length > 0
    ? (sessions.reduce((sum, s) => sum + (s.score || 0), 0) / sessions.length).toFixed(1)
    : "0";
  const totalTests = testResults.length;
  const testPassRate = testResults.length > 0
    ? Math.round((testResults.filter(t => t.passed).length / testResults.length) * 100)
    : 0;

  // Build monthly chart from sessions
  const monthlyData = (() => {
    const months: Record<string, { total: number; count: number }> = {};
    sessions.forEach(s => {
      const d = new Date(s.created_at);
      const key = d.toLocaleString("default", { month: "short" });
      if (!months[key]) months[key] = { total: 0, count: 0 };
      months[key].total += s.score || 0;
      months[key].count += 1;
    });
    return Object.entries(months).map(([month, v]) => ({
      month, score: Math.round(v.total / v.count),
    })).slice(-6);
  })();

  // Aggregate skills from feedback
  const avgSkills = (() => {
    const skills = { communication: 0, technical: 0, confidence: 0, structure: 0 };
    let count = 0;
    sessions.forEach(s => {
      const fb = s.feedback as any;
      if (fb?.skills) {
        skills.communication += fb.skills.communication || 0;
        skills.technical += fb.skills.technical || 0;
        skills.confidence += fb.skills.confidence || 0;
        skills.structure += fb.skills.structure || 0;
        count++;
      }
    });
    if (count === 0) return [
      { label: "Communication", value: 0 },
      { label: "Technical", value: 0 },
      { label: "Confidence", value: 0 },
      { label: "Structure", value: 0 },
    ];
    return [
      { label: "Communication", value: Math.round(skills.communication / count) },
      { label: "Technical", value: Math.round(skills.technical / count) },
      { label: "Confidence", value: Math.round(skills.confidence / count) },
      { label: "Structure", value: Math.round(skills.structure / count) },
    ];
  })();

  // Recent mistakes
  const recentMistakes = sessions
    .filter(s => s.mistakes && Array.isArray(s.mistakes))
    .flatMap(s => s.mistakes as string[])
    .slice(0, 5);

  const stats = [
    { icon: BarChart3, label: "Total Interviews", value: String(totalInterviews) },
    { icon: Target, label: "Avg Score", value: `${avgScore}/10` },
    { icon: Trophy, label: "Tests Passed", value: `${testPassRate}%` },
    { icon: TrendingUp, label: "Level", value: String(profile?.current_level || 1) },
  ];

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "Guest";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Welcome, <span className="gradient-text">{displayName}</span>! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              {profile ? `Level ${profile.current_level} • ${profile.xp_points} XP` : "Track your interview preparation progress."}
            </p>
          </div>
          <Button className="gradient-bg border-0 text-primary-foreground hover:opacity-90 w-fit">
            <Download className="h-4 w-4 mr-2" /> Download Report
          </Button>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Start Learning", icon: BookOpen, path: "/learning", desc: "Continue your course" },
            { label: "Take Mock Test", icon: Brain, path: "/mock-tests", desc: "Practice with MCQs" },
            { label: "AI Interview", icon: Mic, path: "/simulator", desc: "Practice with AI" },
          ].map((action) => (
            <Link key={action.path} to={action.path}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-card rounded-2xl border border-border p-5 shadow-card hover:shadow-card-hover transition-all cursor-pointer"
              >
                <div className="gradient-bg rounded-lg p-2 w-fit mb-3">
                  <action.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <p className="font-display font-semibold text-foreground">{action.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{action.desc}</p>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-5 shadow-card"
            >
              <div className="gradient-bg rounded-lg p-2 w-fit mb-3">
                <s.icon className="h-4 w-4 text-primary-foreground" />
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 shadow-card">
            <h3 className="font-display font-semibold text-foreground mb-4">Monthly Progress</h3>
            {monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: "hsl(var(--primary))", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[280px] text-muted-foreground text-sm">
                Complete interviews to see your progress chart
              </div>
            )}
          </div>

          {/* Mistakes Tracker */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-accent" />
              <h3 className="font-display font-semibold text-foreground">Recent Mistakes</h3>
            </div>
            {recentMistakes.length > 0 ? (
              <ul className="space-y-3">
                {recentMistakes.map((m, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-xl">
                    <span className="text-destructive mt-0.5">•</span> {m}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No mistakes tracked yet. Start practicing!
              </p>
            )}
          </div>

          {/* Skill Breakdown */}
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 shadow-card">
            <h3 className="font-display font-semibold text-foreground mb-4">Skill Breakdown</h3>
            {avgSkills.some(s => s.value > 0) ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={avgSkills} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis dataKey="label" type="category" width={130} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[220px] text-muted-foreground text-sm">
                Complete AI interviews to see skill breakdown
              </div>
            )}
          </div>

          {/* XP & Level */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="h-5 w-5 text-primary" />
              <h3 className="font-display font-semibold text-foreground">Your Progress</h3>
            </div>
            <div className="text-center mb-4">
              <p className="font-display text-4xl font-bold gradient-text">Level {profile?.current_level || 1}</p>
              <p className="text-sm text-muted-foreground mt-1">{profile?.xp_points || 0} XP earned</p>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground font-medium">XP to Next Level</span>
                  <span className="text-muted-foreground">{((profile?.xp_points || 0) % 100)}%</span>
                </div>
                <Progress value={(profile?.xp_points || 0) % 100} className="h-2" />
              </div>
              <div className="flex items-center justify-between text-sm bg-muted/50 p-3 rounded-xl">
                <span className="text-foreground font-medium">Premium</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  profile?.is_premium ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  {profile?.is_premium ? "Active ✨" : "Free Plan"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
