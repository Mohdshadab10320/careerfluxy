import { motion } from "framer-motion";
import { Building2, ArrowRight, Users, Briefcase, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import companyQuestions from "@/data/companyQuestions";

const companyKeys = Object.keys(companyQuestions);

const CompanyCard = ({ companyKey, index }: { companyKey: string; index: number }) => {
  const c = companyQuestions[companyKey];
  const categories = [...new Set(c.questions.map(q => q.category))];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="bg-card rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group"
    >
      <div className={`h-2 bg-gradient-to-r ${c.color}`} />
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-lg font-bold text-foreground">{c.name}</h3>
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">{c.industry}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{c.questions.length} questions</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">{tag}</span>
          ))}
        </div>
        <Button variant="outline" size="sm" className="w-full group-hover:gradient-bg group-hover:text-primary-foreground group-hover:border-transparent transition-all" asChild>
          <Link to={`/companies/${companyKey}`}>
            View Questions <ArrowRight className="h-3 w-3 ml-1" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

const Companies = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="container mx-auto px-4 pt-24 pb-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Company-Specific <span className="gradient-text">Preparation</span>
        </h1>
        <p className="text-muted-foreground mt-2">Practice with real questions from top 20 companies.</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { icon: Building2, label: "20 Companies", desc: "Top recruiters" },
          { icon: BookOpen, label: "250+ Questions", desc: "Curated library" },
          { icon: Users, label: "10K+ Users", desc: "Active community" },
          { icon: Briefcase, label: "8 Industries", desc: "Wide coverage" },
        ].map((s) => (
          <div key={s.label} className="glass rounded-xl p-4 flex items-center gap-3">
            <div className="gradient-bg rounded-lg p-2">
              <s.icon className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {companyKeys.map((key, i) => (
          <CompanyCard key={key} companyKey={key} index={i} />
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

export default Companies;
