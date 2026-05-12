import { motion } from "framer-motion";
import { GraduationCap, Code, Briefcase, Trophy, ArrowRight } from "lucide-react";

const steps = [
  { icon: GraduationCap, title: "Learn", desc: "Pick your career: BCA, MBA, Banking…", color: "from-cyan-500 to-blue-500" },
  { icon: Code, title: "Skills", desc: "AI-curated skills for your goal role.", color: "from-blue-500 to-purple-500" },
  { icon: Briefcase, title: "Practice", desc: "Mock interviews + English drills.", color: "from-purple-500 to-pink-500" },
  { icon: Trophy, title: "Get Hired", desc: "Land offers with confidence.", color: "from-pink-500 to-orange-500" },
];

const CareerRoadmapSection = () => (
  <section className="py-24 bg-background relative overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
          Your AI <span className="gradient-text-neon">Career Roadmap</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          From college to placement — a clear AI-guided path for every learner.
        </p>
      </div>

      <div className="relative grid md:grid-cols-4 gap-6">
        <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-pink-500/40" />
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative text-center"
          >
            <div className={`relative mx-auto h-20 w-20 rounded-2xl bg-gradient-to-br ${s.color} p-[2px]`}>
              <div className="h-full w-full rounded-2xl bg-card flex items-center justify-center">
                <s.icon className="h-8 w-8 text-foreground" />
              </div>
              <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full gradient-neon text-white text-xs font-bold flex items-center justify-center shadow-neon">
                {i + 1}
              </span>
            </div>
            <h3 className="font-display font-semibold text-lg text-foreground mt-4">{s.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
            {i < steps.length - 1 && (
              <ArrowRight className="md:hidden mx-auto mt-3 h-4 w-4 text-muted-foreground" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
export default CareerRoadmapSection;