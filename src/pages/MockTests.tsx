import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, CheckCircle2, Star, Trophy, Zap, ChevronRight, RotateCcw, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Level {
  id: number;
  title: string;
  description: string;
  questions: number;
  xpReward: number;
  badge: string;
  tier: "free" | "limited" | "premium";
}

const levels: Level[] = [
  { id: 1, title: "Beginner Basics", description: "Fundamentals & basic concepts", questions: 10, xpReward: 50, badge: "🌱", tier: "free" },
  { id: 2, title: "Core Concepts", description: "Core knowledge & definitions", questions: 12, xpReward: 75, badge: "📘", tier: "free" },
  { id: 3, title: "Applied Knowledge", description: "Apply what you've learned", questions: 15, xpReward: 100, badge: "⚡", tier: "free" },
  { id: 4, title: "Intermediate Skills", description: "Problem solving & analysis", questions: 15, xpReward: 125, badge: "🔥", tier: "limited" },
  { id: 5, title: "Scenario Master", description: "Real-world scenario questions", questions: 18, xpReward: 150, badge: "🎯", tier: "limited" },
  { id: 6, title: "Advanced Thinker", description: "Complex multi-step problems", questions: 20, xpReward: 175, badge: "🧠", tier: "limited" },
  { id: 7, title: "Expert Challenge", description: "Expert-level questions", questions: 20, xpReward: 200, badge: "💎", tier: "premium" },
  { id: 8, title: "Industry Ready", description: "Industry-standard problems", questions: 22, xpReward: 225, badge: "🏆", tier: "premium" },
  { id: 9, title: "Interview Pro", description: "Interview simulation", questions: 25, xpReward: 250, badge: "👔", tier: "premium" },
  { id: 10, title: "Master Level", description: "Master-level challenges", questions: 25, xpReward: 300, badge: "🌟", tier: "premium" },
  { id: 11, title: "Elite Challenge", description: "Elite difficulty questions", questions: 28, xpReward: 350, badge: "🔮", tier: "premium" },
  { id: 12, title: "Grand Master", description: "Ultimate challenge", questions: 30, xpReward: 500, badge: "👑", tier: "premium" },
];

// Simulated local state
const MockTests = () => {
  const [completedLevels, setCompletedLevels] = useState<Record<number, { score: number; passed: boolean }>>({});
  const [currentLevel, setCurrentLevel] = useState<number | null>(null);
  const totalXP = Object.entries(completedLevels).reduce((sum, [id, r]) => r.passed ? sum + (levels.find(l => l.id === Number(id))?.xpReward || 0) : sum, 0);

  const isUnlocked = (level: Level) => {
    if (level.id === 1) return true;
    const prev = completedLevels[level.id - 1];
    return prev?.passed === true;
  };

  const getTierColor = (tier: string) => {
    if (tier === "free") return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    if (tier === "limited") return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    return "bg-purple-500/10 text-purple-500 border-purple-500/20";
  };

  const getTierLabel = (tier: string) => {
    if (tier === "free") return "Free";
    if (tier === "limited") return "Limited";
    return "Premium 🔒";
  };

  const handleStartTest = (level: Level) => {
    // Simulate completing with random score
    const score = Math.floor(Math.random() * 60) + 40;
    const passed = score >= 60;
    setCompletedLevels(prev => ({ ...prev, [level.id]: { score, passed } }));
    setCurrentLevel(level.id);
  };

  const completedCount = Object.values(completedLevels).filter(r => r.passed).length;
  const overallProgress = (completedCount / levels.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Mock Test <span className="gradient-text">Timeline</span>
          </h1>
          <p className="text-muted-foreground mt-1">Complete levels to unlock the next challenge</p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          {[
            { icon: Star, label: "Total XP", value: totalXP.toString() },
            { icon: Trophy, label: "Levels Cleared", value: `${completedCount}/12` },
            { icon: Zap, label: "Current Streak", value: `${completedCount}` },
            { icon: CheckCircle2, label: "Progress", value: `${Math.round(overallProgress)}%` },
          ].map((s, i) => (
            <div key={s.label} className="glass rounded-2xl p-4 shadow-card">
              <div className="gradient-bg rounded-lg p-2 w-fit mb-2">
                <s.icon className="h-4 w-4 text-primary-foreground" />
              </div>
              <p className="font-display text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Overall Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

          <div className="space-y-8">
            {levels.map((level, i) => {
              const unlocked = isUnlocked(level);
              const result = completedLevels[level.id];
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`relative flex items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-row`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 ${
                        result?.passed
                          ? "bg-primary border-primary text-primary-foreground"
                          : unlocked
                          ? "bg-card border-primary text-foreground"
                          : "bg-muted border-border text-muted-foreground"
                      }`}
                    >
                      {result?.passed ? "✓" : level.badge}
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                      isLeft ? "md:pr-8 md:mr-auto" : "md:pl-8 md:ml-auto"
                    } w-full`}
                  >
                    <div
                      className={`bg-card rounded-2xl border p-5 shadow-card transition-all ${
                        result?.passed
                          ? "border-primary/30"
                          : unlocked
                          ? "border-border hover:shadow-card-hover"
                          : "border-border opacity-60"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-muted-foreground">LEVEL {level.id}</span>
                            <Badge variant="outline" className={getTierColor(level.tier)}>
                              {getTierLabel(level.tier)}
                            </Badge>
                          </div>
                          <h3 className="font-display font-semibold text-foreground">{level.title}</h3>
                          <p className="text-sm text-muted-foreground">{level.description}</p>
                        </div>
                        {!unlocked && <Lock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />}
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span>{level.questions} Questions</span>
                        <span>+{level.xpReward} XP</span>
                      </div>

                      {result && (
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-foreground font-medium">Score</span>
                            <span className={result.passed ? "text-emerald-500" : "text-destructive"}>
                              {result.score}%
                            </span>
                          </div>
                          <Progress value={result.score} className="h-2" />
                          {!result.passed && (
                            <p className="text-xs text-destructive mt-1">Need 60% to pass. Try again!</p>
                          )}
                        </div>
                      )}

                      {unlocked ? (
                        <Button
                          size="sm"
                          className={`w-full ${
                            result?.passed
                              ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/20"
                              : "gradient-bg border-0 text-primary-foreground hover:opacity-90"
                          }`}
                          onClick={() => handleStartTest(level)}
                        >
                          {result?.passed ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 mr-1" /> Completed — Retry
                            </>
                          ) : result ? (
                            <>
                              <RotateCcw className="h-4 w-4 mr-1" /> Retry Test
                            </>
                          ) : (
                            <>
                              Start Test <ChevronRight className="h-4 w-4 ml-1" />
                            </>
                          )}
                        </Button>
                      ) : level.tier === "premium" ? (
                        <Button size="sm" variant="outline" className="w-full" disabled>
                          <Crown className="h-4 w-4 mr-1" /> Upgrade to Premium
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" className="w-full" disabled>
                          <Lock className="h-4 w-4 mr-1" /> Complete Previous Level
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MockTests;
