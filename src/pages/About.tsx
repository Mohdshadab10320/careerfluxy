import { motion } from "framer-motion";
import { Bot, Building2, Brain, BarChart3, FileText, Globe, Shield, Users, Zap, Target, Award, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  { icon: Bot, title: "AI Interview Simulator", desc: "Practice with an intelligent AI interviewer that adapts to your skill level, course, and company preference. Get real-time question-answer simulation." },
  { icon: Building2, title: "Company-Specific Preparation", desc: "Access curated interview questions from top companies like TCS, Infosys, Amazon, SBI, HDFC, Wipro, and Flipkart." },
  { icon: Brain, title: "Smart Answer Evaluation", desc: "Every answer you give is evaluated by AI. Get weak, average, and ideal answer examples along with a score out of 10." },
  { icon: BarChart3, title: "Performance Dashboard", desc: "Track your monthly progress, strengths, weaknesses, streaks, and see how you rank on the leaderboard." },
  { icon: FileText, title: "PDF Reports & Certificates", desc: "Download detailed interview performance reports. Premium users can also generate completion certificates." },
  { icon: Globe, title: "Multi-Language Support", desc: "Practice in English, Hindi, or Hinglish — whichever language you're most comfortable with." },
  { icon: Shield, title: "Resume-Based Questions", desc: "Upload your resume and our AI will generate personalized interview questions based on your experience and skills." },
  { icon: Target, title: "Difficulty Levels & AI Moods", desc: "Choose from Beginner, Intermediate, or Advanced difficulty. Set AI mood to Friendly, Strict, Corporate, or Rapid Fire." },
];

const stats = [
  { value: "10,000+", label: "Active Users" },
  { value: "500+", label: "Interview Questions" },
  { value: "50+", label: "Companies Covered" },
  { value: "4.9★", label: "User Rating" },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="pt-28 pb-20 gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-accent/20 blur-3xl animate-pulse-glow" />
      </div>
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm mb-6" style={{ color: "hsl(220, 20%, 85%)" }}>
            <Zap className="h-3.5 w-3.5" />
            About CareerFluxy
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: "hsl(0, 0%, 100%)" }}>
            Practice Smart.{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, hsl(210, 100%, 70%), hsl(270, 80%, 70%))" }}>
              Get Hired Faster.
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl leading-relaxed" style={{ color: "hsl(220, 20%, 75%)" }}>
            CareerFluxy is an AI-powered interview preparation SaaS platform that helps students and job seekers practice interviews using AI simulation, company-specific mock tests, performance analytics, and resume-based question generation.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-12 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-display text-3xl md:text-4xl font-bold gradient-text">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Mission */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="gradient-bg rounded-2xl p-3 w-14 h-14 mx-auto flex items-center justify-center mb-6">
              <Rocket className="h-7 w-7 text-primary-foreground" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We believe every student and job seeker deserves access to world-class interview preparation — regardless of their background or budget. CareerFluxy uses cutting-edge AI to simulate real interview experiences, provide actionable feedback, and help candidates land their dream jobs faster.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Platform <span className="gradient-text">Features</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Everything you need to master your interview preparation in one place.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-2xl border border-border p-6 shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <div className="gradient-bg rounded-xl p-3 w-fit mb-4">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Who is it for */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Who Is <span className="gradient-text">CareerFluxy</span> For?
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Users, title: "College Students", desc: "Preparing for campus placements and off-campus drives." },
            { icon: Award, title: "Job Seekers", desc: "Switching careers or preparing for interviews at top companies." },
            { icon: Target, title: "Govt. Exam Aspirants", desc: "Preparing for SSC, Banking, and other government job interviews." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className="gradient-bg rounded-xl p-3 w-fit mx-auto mb-4">
                <item.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 gradient-hero relative overflow-hidden">
      <div className="container mx-auto px-4 relative text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: "hsl(0, 0%, 100%)" }}>
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: "hsl(220, 20%, 75%)" }}>
            Join thousands of candidates who are already practicing smarter with CareerFluxy.
          </p>
          <Button size="lg" className="gradient-bg border-0 text-primary-foreground text-base px-8 py-6 hover:opacity-90 shadow-glow" asChild>
            <Link to="/simulator">Start Practicing Now</Link>
          </Button>
        </motion.div>
      </div>
    </section>

    <Footer />
  </div>
);

export default About;
