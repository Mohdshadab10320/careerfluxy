import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, CheckCircle2, Star, Trophy, Zap, ChevronRight, RotateCcw, Crown, ArrowLeft, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import courseVideos from "@/data/courseVideos";
import mockTestQuestions, { MCQ } from "@/data/mockTestQuestions";

const courseKeys = Object.keys(courseVideos);

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
  { id: 2, title: "Core Concepts", description: "Core knowledge & definitions", questions: 10, xpReward: 75, badge: "📘", tier: "free" },
  { id: 3, title: "Applied Knowledge", description: "Apply what you've learned", questions: 10, xpReward: 100, badge: "⚡", tier: "free" },
  { id: 4, title: "Intermediate Skills", description: "Problem solving & analysis", questions: 10, xpReward: 125, badge: "🔥", tier: "limited" },
  { id: 5, title: "Scenario Master", description: "Real-world scenario questions", questions: 10, xpReward: 150, badge: "🎯", tier: "limited" },
  { id: 6, title: "Advanced Thinker", description: "Complex multi-step problems", questions: 10, xpReward: 175, badge: "🧠", tier: "limited" },
  { id: 7, title: "Expert Challenge", description: "Expert-level questions", questions: 10, xpReward: 200, badge: "💎", tier: "premium" },
  { id: 8, title: "Industry Ready", description: "Industry-standard problems", questions: 10, xpReward: 225, badge: "🏆", tier: "premium" },
  { id: 9, title: "Interview Pro", description: "Interview simulation", questions: 10, xpReward: 250, badge: "👔", tier: "premium" },
  { id: 10, title: "Master Level", description: "Master-level challenges", questions: 10, xpReward: 300, badge: "🌟", tier: "premium" },
  { id: 11, title: "Elite Challenge", description: "Elite difficulty questions", questions: 10, xpReward: 350, badge: "🔮", tier: "premium" },
  { id: 12, title: "Grand Master", description: "Ultimate challenge", questions: 10, xpReward: 500, badge: "👑", tier: "premium" },
];

const MockTests = () => {
  const [searchParams] = useSearchParams();
  const [selectedCourse, setSelectedCourse] = useState(searchParams.get("course") || "");
  const [completedLevels, setCompletedLevels] = useState<Record<string, Record<number, { score: number; passed: boolean }>>>({});
  const [activeQuiz, setActiveQuiz] = useState<{ level: Level; questions: MCQ[] } | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const courseCompleted = selectedCourse ? (completedLevels[selectedCourse] || {}) : {};
  const totalXP = Object.entries(courseCompleted).reduce((sum, [id, r]) => r.passed ? sum + (levels.find(l => l.id === Number(id))?.xpReward || 0) : sum, 0);
  const completedCount = Object.values(courseCompleted).filter(r => r.passed).length;
  const overallProgress = (completedCount / levels.length) * 100;

  const isUnlocked = (level: Level) => {
    if (level.id === 1) return true;
    return courseCompleted[level.id - 1]?.passed === true;
  };

  const getQuestions = (levelId: number): MCQ[] => {
    const bank = mockTestQuestions[selectedCourse];
    if (!bank) return [];
    // Use level-specific questions or fallback to level 1
    const qs = bank[String(levelId)] || bank["1"] || [];
    // Shuffle and return
    return [...qs].sort(() => Math.random() - 0.5).slice(0, 10);
  };

  const startQuiz = (level: Level) => {
    const questions = getQuestions(level.id);
    setActiveQuiz({ level, questions });
    setAnswers({});
    setQuizSubmitted(false);
  };

  const submitQuiz = () => {
    if (!activeQuiz) return;
    setQuizSubmitted(true);
    const correct = activeQuiz.questions.reduce((sum, q, i) => answers[i] === q.correctIndex ? sum + 1 : sum, 0);
    const score = Math.round((correct / activeQuiz.questions.length) * 100);
    const passed = score >= 60;
    setCompletedLevels(prev => ({
      ...prev,
      [selectedCourse]: { ...(prev[selectedCourse] || {}), [activeQuiz.level.id]: { score, passed } },
    }));
  };

  const quizScore = useMemo(() => {
    if (!activeQuiz || !quizSubmitted) return 0;
    const correct = activeQuiz.questions.reduce((sum, q, i) => answers[i] === q.correctIndex ? sum + 1 : sum, 0);
    return Math.round((correct / activeQuiz.questions.length) * 100);
  }, [activeQuiz, answers, quizSubmitted]);

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

  // ─── Course Selection ────────────────────────
  if (!selectedCourse) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Mock Test <span className="gradient-text">Timeline</span>
            </h1>
            <p className="text-muted-foreground mt-2">Select a course to start your mock test journey.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courseKeys.map((key, i) => {
              const c = courseVideos[key];
              return (
                <motion.button
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedCourse(key)}
                  className="bg-card border border-border rounded-2xl p-6 text-left hover:border-primary/50 hover:shadow-lg transition-all group"
                >
                  <span className="text-5xl mb-3 block">{c.icon}</span>
                  <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{c.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{c.description}</p>
                </motion.button>
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ─── Active Quiz ────────────────────────
  if (activeQuiz) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-16 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="sm" onClick={() => setActiveQuiz(null)}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Timeline
            </Button>
            <Badge variant="outline">{courseVideos[selectedCourse]?.icon} Level {activeQuiz.level.id}</Badge>
          </div>

          <h2 className="font-display text-2xl font-bold text-foreground mb-6">{activeQuiz.level.title}</h2>

          <div className="space-y-6">
            {activeQuiz.questions.map((q, qi) => (
              <motion.div
                key={qi}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: qi * 0.03 }}
                className="bg-card border border-border rounded-2xl p-5 shadow-card"
              >
                <p className="font-medium text-foreground mb-1">
                  <span className="text-primary font-bold mr-2">Q{qi + 1}.</span>
                  {q.question}
                </p>
                <p className="text-xs text-muted-foreground mb-3">Topic: {q.topic}</p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => {
                    const selected = answers[qi] === oi;
                    const isCorrect = oi === q.correctIndex;
                    let optClass = "bg-muted/50 border-border hover:bg-muted";
                    if (quizSubmitted) {
                      if (isCorrect) optClass = "bg-emerald-500/10 border-emerald-500/30 text-emerald-700";
                      else if (selected && !isCorrect) optClass = "bg-destructive/10 border-destructive/30 text-destructive";
                    } else if (selected) {
                      optClass = "bg-primary/10 border-primary/30 text-primary";
                    }
                    return (
                      <button
                        key={oi}
                        onClick={() => !quizSubmitted && setAnswers(prev => ({ ...prev, [qi]: oi }))}
                        disabled={quizSubmitted}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all flex items-center gap-3 ${optClass}`}
                      >
                        <span className="w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {String.fromCharCode(65 + oi)}
                        </span>
                        {opt}
                        {quizSubmitted && isCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-500 ml-auto flex-shrink-0" />}
                        {quizSubmitted && selected && !isCorrect && <XCircle className="h-4 w-4 text-destructive ml-auto flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
                {quizSubmitted && (
                  <p className="text-xs text-muted-foreground mt-3 bg-muted/50 p-3 rounded-lg">
                    💡 {q.explanation}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex gap-4">
            {!quizSubmitted ? (
              <Button
                onClick={submitQuiz}
                disabled={Object.keys(answers).length < activeQuiz.questions.length}
                className="gradient-bg border-0 text-primary-foreground hover:opacity-90"
              >
                Submit Test ({Object.keys(answers).length}/{activeQuiz.questions.length} answered)
              </Button>
            ) : (
              <div className="w-full bg-card border border-border rounded-2xl p-6 shadow-card">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {quizScore >= 60 ? "🎉 Congratulations!" : "😔 Try Again"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  Your Score: <span className={`font-bold ${quizScore >= 60 ? "text-emerald-500" : "text-destructive"}`}>{quizScore}%</span>
                  {quizScore >= 60 ? " — Level unlocked! +XP earned." : " — You need at least 60% to pass."}
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setActiveQuiz(null)}>
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back to Timeline
                  </Button>
                  {quizScore < 60 && (
                    <Button onClick={() => startQuiz(activeQuiz.level)} className="gradient-bg border-0 text-primary-foreground">
                      <RotateCcw className="h-4 w-4 mr-1" /> Retry
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ─── Timeline ────────────────────────
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" onClick={() => setSelectedCourse("")}>
            <ArrowLeft className="h-4 w-4 mr-1" /> All Courses
          </Button>
          <Badge variant="outline" className="text-sm">{courseVideos[selectedCourse]?.icon} {courseVideos[selectedCourse]?.label}</Badge>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Mock Test <span className="gradient-text">Timeline</span>
          </h1>
          <p className="text-muted-foreground mt-1">Complete levels to unlock the next challenge</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Star, label: "Total XP", value: totalXP.toString() },
            { icon: Trophy, label: "Levels Cleared", value: `${completedCount}/12` },
            { icon: Zap, label: "Current Streak", value: `${completedCount}` },
            { icon: CheckCircle2, label: "Progress", value: `${Math.round(overallProgress)}%` },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-4 shadow-card">
              <div className="gradient-bg rounded-lg p-2 w-fit mb-2">
                <s.icon className="h-4 w-4 text-primary-foreground" />
              </div>
              <p className="font-display text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </div>

        {/* Level Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {levels.map((level, i) => {
            const unlocked = isUnlocked(level);
            const result = courseCompleted[level.id];
            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`bg-card rounded-2xl border p-5 shadow-card transition-all ${
                  result?.passed ? "border-primary/30" : unlocked ? "border-border hover:shadow-card-hover" : "border-border opacity-60"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{level.badge}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold text-muted-foreground">LEVEL {level.id}</span>
                        <Badge variant="outline" className={getTierColor(level.tier)}>{getTierLabel(level.tier)}</Badge>
                      </div>
                      <h3 className="font-display font-semibold text-foreground">{level.title}</h3>
                    </div>
                  </div>
                  {!unlocked && <Lock className="h-5 w-5 text-muted-foreground" />}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{level.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span>{level.questions} Questions</span>
                  <span>+{level.xpReward} XP</span>
                </div>

                {result && (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground font-medium">Score</span>
                      <span className={result.passed ? "text-emerald-500" : "text-destructive"}>{result.score}%</span>
                    </div>
                    <Progress value={result.score} className="h-2" />
                  </div>
                )}

                {unlocked ? (
                  <Button
                    size="sm"
                    className={`w-full ${result?.passed ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/20" : "gradient-bg border-0 text-primary-foreground hover:opacity-90"}`}
                    onClick={() => startQuiz(level)}
                  >
                    {result?.passed ? <><CheckCircle2 className="h-4 w-4 mr-1" /> Completed — Retry</> : result ? <><RotateCcw className="h-4 w-4 mr-1" /> Retry Test</> : <>Start Test <ChevronRight className="h-4 w-4 ml-1" /></>}
                  </Button>
                ) : level.tier === "premium" ? (
                  <Button size="sm" variant="outline" className="w-full" disabled><Crown className="h-4 w-4 mr-1" /> Upgrade to Premium</Button>
                ) : (
                  <Button size="sm" variant="outline" className="w-full" disabled><Lock className="h-4 w-4 mr-1" /> Complete Previous Level</Button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MockTests;
