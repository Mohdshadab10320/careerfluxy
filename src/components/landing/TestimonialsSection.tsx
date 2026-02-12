import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Priya Sharma", role: "Software Engineer @ TCS", text: "CareerFluxy helped me prepare for TCS-specific questions. Got selected in my first attempt!", rating: 5 },
  { name: "Rahul Verma", role: "Data Analyst @ Amazon", text: "The AI feedback is incredibly detailed. It pinpointed exactly where I was going wrong.", rating: 5 },
  { name: "Ananya Patel", role: "Banking Officer @ SBI", text: "The company-specific prep for banking exams is a game changer. Highly recommended!", rating: 5 },
];

const TestimonialsSection = () => (
  <section className="py-24 bg-muted/50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Loved by <span className="gradient-text">Thousands</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-card rounded-2xl border border-border p-6 shadow-card"
          >
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-foreground leading-relaxed mb-4">"{t.text}"</p>
            <div>
              <p className="font-semibold text-sm text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
