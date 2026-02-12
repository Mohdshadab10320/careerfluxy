import { motion } from "framer-motion";
import { Bot, Building2, Brain, BarChart3, FileText, Globe } from "lucide-react";

const features = [
  { icon: Bot, title: "AI Interview Simulator", desc: "Practice with an intelligent AI that adapts to your skill level and gives real-time feedback." },
  { icon: Building2, title: "Company-Specific Questions", desc: "Prepare with actual questions from TCS, Infosys, Amazon, and 50+ top companies." },
  { icon: Brain, title: "Smart Evaluation", desc: "Get detailed scoring with weak, average, and ideal answer comparisons." },
  { icon: BarChart3, title: "Performance Dashboard", desc: "Track your progress with detailed analytics, streak counters, and leaderboards." },
  { icon: FileText, title: "PDF Reports", desc: "Download comprehensive interview reports with scores and improvement tips." },
  { icon: Globe, title: "Multi-Language Mode", desc: "Practice in English, Hindi, or Hinglish — whatever you're comfortable with." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FeaturesSection = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Everything You Need to <span className="gradient-text">Ace Interviews</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          A complete toolkit designed to transform your interview preparation.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={item}
            className="group rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-card-hover transition-all duration-300"
          >
            <div className="gradient-bg rounded-xl p-3 w-fit mb-4">
              <f.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default FeaturesSection;
