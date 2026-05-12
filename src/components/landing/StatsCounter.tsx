import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const Counter = ({ to, suffix = "" }: { to: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 2, bounce: 0 });
  const display = useTransform(spring, (v) => Math.floor(v).toLocaleString() + suffix);

  useEffect(() => {
    if (inView) motionValue.set(to);
  }, [inView, motionValue, to]);

  return <motion.span ref={ref}>{display}</motion.span>;
};

const stats = [
  { value: 12500, suffix: "+", label: "Active learners" },
  { value: 850, suffix: "+", label: "AI questions" },
  { value: 50, suffix: "+", label: "Top companies" },
  { value: 95, suffix: "%", label: "Avg. improvement" },
];

const StatsCounter = () => (
  <section className="py-20 bg-background relative overflow-hidden">
    <div className="absolute inset-0 aurora-bg opacity-20 pointer-events-none" />
    <div className="container relative mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-6 text-center hover:shadow-neon transition-shadow"
          >
            <p className="font-display text-4xl md:text-5xl font-bold gradient-text-neon">
              <Counter to={s.value} suffix={s.suffix} />
            </p>
            <p className="text-sm text-muted-foreground mt-2">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
export default StatsCounter;