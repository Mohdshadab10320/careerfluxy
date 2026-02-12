import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    {/* BG image */}
    <div className="absolute inset-0">
      <img src={heroBg} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 gradient-hero opacity-80" />
    </div>

    <div className="container relative mx-auto px-4 pt-28 pb-20">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary-foreground mb-8"
        >
          <Sparkles className="h-3.5 w-3.5" />
          AI-Powered Interview Practice
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
          style={{ color: "hsl(0 0% 100%)" }}
        >
          Crack Your Dream Job with{" "}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, hsl(210, 100%, 70%), hsl(270, 80%, 70%))" }}>
            AI Interview Practice
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl max-w-2xl mx-auto"
          style={{ color: "hsl(220, 20%, 75%)" }}
        >
          Practice real interview questions with AI. Get instant feedback, detailed scoring, and personalized improvement plans.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" className="gradient-bg border-0 text-primary-foreground text-base px-8 py-6 hover:opacity-90 shadow-glow" asChild>
            <Link to="/simulator">
              Start Free Mock <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="text-base px-8 py-6 border-primary/30 hover:bg-primary/10" style={{ color: "hsl(220, 20%, 85%)" }} asChild>
            <Link to="/companies">
              <Play className="mr-2 h-4 w-4" /> Explore Companies
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 flex items-center justify-center gap-8 flex-wrap"
          style={{ color: "hsl(220, 15%, 55%)" }}
        >
          {["10K+ Users", "500+ Questions", "50+ Companies", "4.9★ Rating"].map((stat) => (
            <span key={stat} className="text-sm font-medium">{stat}</span>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
