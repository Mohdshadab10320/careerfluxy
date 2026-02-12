import { motion } from "framer-motion";
import { BookOpen, Mic, TrendingUp } from "lucide-react";

const steps = [
  { icon: BookOpen, step: "01", title: "Select Course / Company", desc: "Choose your target role, company, or course category." },
  { icon: Mic, step: "02", title: "Practice with AI", desc: "Answer interview questions with text or voice. AI adapts difficulty in real-time." },
  { icon: TrendingUp, step: "03", title: "Get Score + Feedback", desc: "Receive detailed scoring, improvement plan, and downloadable reports." },
];

const HowItWorks = () => (
  <section className="py-24 bg-muted/50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          How It <span className="gradient-text">Works</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="text-center"
          >
            <div className="gradient-bg rounded-2xl p-4 w-16 h-16 mx-auto flex items-center justify-center mb-5">
              <s.icon className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="text-xs font-bold text-primary tracking-widest uppercase">Step {s.step}</span>
            <h3 className="font-display font-semibold text-lg text-foreground mt-2 mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
