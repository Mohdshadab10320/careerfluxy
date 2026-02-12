import { motion } from "framer-motion";
import { Building2, ArrowRight, Users, Briefcase, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const companies = [
  { name: "TCS", roles: "120+ questions", category: "IT Services", color: "from-blue-500 to-blue-700" },
  { name: "Infosys", roles: "95+ questions", category: "IT Services", color: "from-cyan-500 to-blue-600" },
  { name: "Wipro", roles: "80+ questions", category: "IT Services", color: "from-indigo-500 to-violet-600" },
  { name: "HDFC", roles: "65+ questions", category: "Banking", color: "from-red-500 to-rose-600" },
  { name: "SBI", roles: "90+ questions", category: "Banking", color: "from-blue-600 to-indigo-700" },
  { name: "Amazon", roles: "150+ questions", category: "Big Tech", color: "from-orange-500 to-amber-600" },
  { name: "Flipkart", roles: "70+ questions", category: "E-Commerce", color: "from-yellow-500 to-orange-600" },
];

const CompanyCard = ({ company, index }: { company: typeof companies[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08 }}
    className="bg-card rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group"
  >
    <div className={`h-2 bg-gradient-to-r ${company.color}`} />
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-xl font-bold text-foreground">{company.name}</h3>
        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">{company.category}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-5">{company.roles}</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {["HR", "Technical", "Coding"].map((tag) => (
          <span key={tag} className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">{tag}</span>
        ))}
      </div>
      <Button variant="outline" size="sm" className="w-full group-hover:gradient-bg group-hover:text-primary-foreground group-hover:border-transparent transition-all" asChild>
        <Link to="/simulator">
          Practice Now <ArrowRight className="h-3 w-3 ml-1" />
        </Link>
      </Button>
    </div>
  </motion.div>
);

const Companies = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="container mx-auto px-4 pt-24 pb-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Company-Specific <span className="gradient-text">Preparation</span>
        </h1>
        <p className="text-muted-foreground mt-2">Practice with real questions from top companies.</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {[
          { icon: Building2, label: "7+ Companies", desc: "Top recruiters" },
          { icon: BookOpen, label: "670+ Questions", desc: "Curated library" },
          { icon: Users, label: "10K+ Users", desc: "Active community" },
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((c, i) => (
          <CompanyCard key={c.name} company={c} index={i} />
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

export default Companies;
