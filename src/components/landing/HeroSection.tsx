import { motion } from "framer-motion";
import { ArrowRight, Mic, Sparkles, Bot, Zap, TrendingUp, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Particles from "@/components/effects/Particles";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden bg-[hsl(230_30%_6%)]">
    {/* Aurora orbs */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full opacity-50 animate-float-slow"
        style={{ background: "radial-gradient(circle, hsl(var(--neon-blue) / 0.6), transparent 60%)" }} />
      <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full opacity-50 animate-float-slow"
        style={{ background: "radial-gradient(circle, hsl(var(--neon-purple) / 0.6), transparent 60%)", animationDelay: "2s" }} />
      <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full opacity-40 animate-float-slow"
        style={{ background: "radial-gradient(circle, hsl(var(--neon-pink) / 0.5), transparent 60%)", animationDelay: "4s" }} />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--neon-blue)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--neon-blue)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
    </div>
    <Particles count={40} />

    <div className="container relative mx-auto px-4 pt-28 pb-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur px-4 py-1.5 text-xs font-medium text-white/80 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            AI-Powered • Live Interview Practice
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white"
          >
            Master Interviews & <br />
            <span className="gradient-text-neon">English Speaking</span> with AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-base md:text-lg max-w-xl text-white/60 leading-relaxed"
          >
            Practice interviews, improve spoken English, build resumes, and become job-ready with CareerFluxy AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Button size="lg" className="gradient-neon border-0 text-white text-base px-7 py-6 shadow-neon hover:scale-[1.03] transition-transform" asChild>
              <Link to="/simulator">
                <Sparkles className="mr-2 h-4 w-4" /> Start AI Interview
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-7 py-6 bg-white/5 border-white/15 text-white hover:bg-white/10" asChild>
              <Link to="/spoken-english">
                <Mic className="mr-2 h-4 w-4" /> Practice English
              </Link>
            </Button>
            <Button size="lg" variant="ghost" className="text-base px-5 py-6 text-white/80 hover:text-white hover:bg-white/5" asChild>
              <a href="#features">
                Explore Features <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 grid grid-cols-3 gap-6 max-w-md"
          >
            {[
              { v: "10K+", l: "Active learners" },
              { v: "500+", l: "AI questions" },
              { v: "4.9★", l: "User rating" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-2xl md:text-3xl font-bold gradient-text-neon">{s.v}</p>
                <p className="text-xs text-white/50 mt-1">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative hidden lg:block"
        >
          <div className="absolute -inset-6 rounded-3xl gradient-neon opacity-30 blur-2xl animate-gradient" />
          <div className="relative neon-border rounded-3xl bg-[hsl(230_30%_8%/0.7)] backdrop-blur-xl p-6 shadow-neon">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl gradient-neon flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">AI Interviewer</p>
                  <p className="text-[10px] text-cyan-400 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" /> Live session
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-white/40 font-mono">02:34</span>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl bg-white/5 border border-white/5 p-3 text-sm text-white/80">
                <span className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold">Question 3</span>
                <p className="mt-1">Tell me about a time you handled a tight deadline.</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-3 text-sm text-white/80 ml-6">
                <span className="text-[10px] uppercase tracking-wider text-purple-300 font-bold flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" /> Your answer
                </span>
                <p className="mt-1">In my final-year project, I led a team of 4 to deliver a full-stack app in 2 weeks…</p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                {[
                  { l: "Confidence", v: 86, c: "from-cyan-400 to-blue-500" },
                  { l: "Clarity", v: 92, c: "from-purple-400 to-pink-500" },
                  { l: "Fluency", v: 78, c: "from-pink-400 to-orange-400" },
                ].map((m) => (
                  <div key={m.l} className="rounded-xl bg-white/5 p-3 border border-white/5">
                    <p className="text-[10px] text-white/50">{m.l}</p>
                    <p className="font-display text-lg font-bold text-white mt-0.5">{m.v}%</p>
                    <div className="mt-1.5 h-1 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${m.v}%` }}
                        transition={{ duration: 1.2, delay: 0.8 }}
                        className={`h-full rounded-full bg-gradient-to-r ${m.c}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 text-[11px] text-white/50">
                <span className="flex items-center gap-1.5"><Zap className="h-3 w-3 text-yellow-400" /> +120 XP earned</span>
                <span className="flex items-center gap-1.5"><TrendingUp className="h-3 w-3 text-green-400" /> Up 12% this week</span>
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-4 -right-4 rounded-2xl gradient-neon p-3 shadow-neon"
          >
            <Sparkles className="h-5 w-5 text-white" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
