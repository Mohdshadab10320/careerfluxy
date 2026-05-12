import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Is CareerFluxy free to use?", a: "Yes. Free plan includes 3 mocks per week, basic feedback, and English Levels 1–3. Upgrade for voice/camera mode, unlimited mocks, and certificates." },
  { q: "How does the AI evaluate my answers?", a: "Our AI scores you on confidence, clarity, fluency, and accuracy — and gives weak/average/ideal answer comparisons after each question." },
  { q: "Can I practice in Hindi or Hinglish?", a: "Absolutely. Toggle EN, HI, or Hinglish from the navbar — interviews and English drills both adapt." },
  { q: "Do I get a certificate?", a: "Premium users get downloadable certificates after passing mock tests and completing English levels with 60%+." },
  { q: "Is my data safe?", a: "All sessions are encrypted, stored under your account only, and never shared. RBAC and RLS protect every record." },
];

const FAQSection = () => (
  <section className="py-24 bg-muted/30">
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Frequently Asked <span className="gradient-text-neon">Questions</span>
        </h2>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border border-border bg-card px-5 shadow-card">
            <AccordionTrigger className="font-display font-semibold text-left hover:no-underline">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
export default FAQSection;