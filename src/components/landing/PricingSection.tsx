import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    features: ["3 mocks per week", "Basic feedback", "Limited questions", "Community support"],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "₹499",
    period: "/month",
    features: ["Unlimited mocks", "Company-specific questions", "Advanced analytics", "PDF reports", "Priority support"],
    cta: "Start Pro Trial",
    highlight: true,
  },
  {
    name: "Premium",
    price: "₹999",
    period: "/month",
    features: ["Everything in Pro", "Voice AI Interview", "Resume analysis", "Certificate generation", "1-on-1 mentoring"],
    cta: "Go Premium",
    highlight: false,
  },
];

const PricingSection = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Simple, Transparent <span className="gradient-text">Pricing</span>
        </h2>
        <p className="mt-4 text-muted-foreground">Start free. Upgrade when you're ready.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`rounded-2xl p-8 border ${
              plan.highlight
                ? "gradient-bg text-primary-foreground border-transparent shadow-glow scale-105"
                : "bg-card border-border shadow-card"
            }`}
          >
            <h3 className="font-display font-semibold text-xl mb-1">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-display text-4xl font-bold">{plan.price}</span>
              <span className={`text-sm ${plan.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {plan.period}
              </span>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              className={`w-full ${
                plan.highlight
                  ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  : "gradient-bg text-primary-foreground border-0 hover:opacity-90"
              }`}
              asChild
            >
              <Link to="/simulator">{plan.cta}</Link>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
