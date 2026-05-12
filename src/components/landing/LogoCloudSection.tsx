import InfiniteSlider from "./InfiniteSlider";

const companies = ["TCS", "Infosys", "Wipro", "Amazon", "Flipkart", "HDFC", "SBI", "Accenture", "Cognizant", "Deloitte", "Microsoft", "Google", "Capgemini", "ICICI"];

const LogoCloudSection = () => (
  <section className="py-16 bg-background border-y border-border/50">
    <div className="container mx-auto px-4 mb-8">
      <p className="text-center text-xs font-bold tracking-[0.3em] text-muted-foreground uppercase">
        Trusted preparation for top companies
      </p>
    </div>
    <InfiniteSlider
      speed="slow"
      items={companies.map((c) => (
        <div className="flex items-center justify-center h-12 px-8 rounded-2xl bg-card/50 border border-border/50 backdrop-blur min-w-[140px]">
          <span className="font-display font-bold text-lg text-muted-foreground/80 hover:text-foreground transition-colors">{c}</span>
        </div>
      ))}
    />
  </section>
);
export default LogoCloudSection;