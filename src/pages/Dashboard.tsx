import { motion } from "framer-motion";
import { BarChart3, Trophy, Target, TrendingUp, Flame, Download, Award } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const monthlyData = [
  { month: "Sep", score: 45 },
  { month: "Oct", score: 55 },
  { month: "Nov", score: 60 },
  { month: "Dec", score: 68 },
  { month: "Jan", score: 74 },
  { month: "Feb", score: 82 },
];

const strengths = [
  { label: "Communication", value: 85 },
  { label: "Technical Knowledge", value: 72 },
  { label: "Problem Solving", value: 78 },
  { label: "Confidence", value: 65 },
];

const leaderboard = [
  { name: "Priya S.", score: 94, rank: 1 },
  { name: "Rahul V.", score: 91, rank: 2 },
  { name: "You", score: 82, rank: 3 },
  { name: "Ananya P.", score: 79, rank: 4 },
  { name: "Vikram K.", score: 75, rank: 5 },
];

const stats = [
  { icon: BarChart3, label: "Total Interviews", value: "47" },
  { icon: Target, label: "Avg Score", value: "7.8/10" },
  { icon: Flame, label: "Current Streak", value: "12 days" },
  { icon: TrendingUp, label: "Improvement", value: "+23%" },
];

const Dashboard = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="container mx-auto px-4 pt-24 pb-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Your <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground mt-1">Track your interview preparation progress.</p>
        </div>
        <Button className="gradient-bg border-0 text-primary-foreground hover:opacity-90 w-fit">
          <Download className="h-4 w-4 mr-2" /> Download Report
        </Button>
      </motion.div>

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
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
              <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: "hsl(var(--primary))", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Leaderboard */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-5 w-5 text-primary" />
            <h3 className="font-display font-semibold text-foreground">Leaderboard</h3>
          </div>
          <div className="space-y-3">
            {leaderboard.map((u) => (
              <div
                key={u.rank}
                className={`flex items-center justify-between p-3 rounded-xl text-sm ${
                  u.name === "You" ? "gradient-bg text-primary-foreground" : "bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold w-5">#{u.rank}</span>
                  <span className="font-medium">{u.name}</span>
                </div>
                <span className="font-semibold">{u.score}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 shadow-card">
          <h3 className="font-display font-semibold text-foreground mb-4">Skill Breakdown</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={strengths} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis dataKey="label" type="category" width={130} stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weakness Areas */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Award className="h-5 w-5 text-accent" />
            <h3 className="font-display font-semibold text-foreground">Areas to Improve</h3>
          </div>
          <div className="space-y-4">
            {[
              { area: "Confidence Level", pct: 65 },
              { area: "System Design", pct: 48 },
              { area: "Behavioral Answers", pct: 58 },
            ].map((w) => (
              <div key={w.area}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground font-medium">{w.area}</span>
                  <span className="text-muted-foreground">{w.pct}%</span>
                </div>
                <Progress value={w.pct} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default Dashboard;
