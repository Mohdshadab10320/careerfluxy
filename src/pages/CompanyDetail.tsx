import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MessageSquare, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import companyQuestions from "@/data/companyQuestions";

const categoryColors: Record<string, string> = {
  Technical: "bg-blue-500/10 text-blue-500",
  HR: "bg-green-500/10 text-green-500",
  Behavioral: "bg-purple-500/10 text-purple-500",
  Coding: "bg-orange-500/10 text-orange-500",
  Domain: "bg-teal-500/10 text-teal-500",
  "Case Study": "bg-pink-500/10 text-pink-500",
};

const CompanyDetail = () => {
  const { companyId } = useParams();
  const company = companyId ? companyQuestions[companyId] : null;

  if (!company) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-16 text-center">
          <p className="text-muted-foreground">Company not found.</p>
          <Button asChild className="mt-4"><Link to="/companies">Back to Companies</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  const categories = [...new Set(company.questions.map(q => q.category))];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/companies"><ArrowLeft className="h-4 w-4 mr-1" /> Back to Companies</Link>
        </Button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className={`rounded-2xl bg-gradient-to-r ${company.color} p-6 mb-8 text-white`}>
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="h-8 w-8" />
              <h1 className="font-display text-3xl font-bold">{company.name}</h1>
            </div>
            <p className="opacity-90">{company.industry} • {company.questions.length} Interview Questions</p>
          </div>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <Badge key={cat} variant="secondary" className={categoryColors[cat] || ""}>
              {cat} ({company.questions.filter(q => q.category === cat).length})
            </Badge>
          ))}
        </div>

        <div className="grid gap-3">
          {company.questions.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-card border border-border rounded-xl p-4 flex items-start gap-3"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="text-foreground font-medium">{q.question}</p>
                <Badge variant="outline" className={`mt-2 text-xs ${categoryColors[q.category] || ""}`}>
                  {q.category}
                </Badge>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/simulator?course=${company.industry.toLowerCase().includes("bank") ? "banking" : "it"}`}>
                  <MessageSquare className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button className="gradient-bg" asChild>
            <Link to={`/simulator?course=${company.industry.toLowerCase().includes("bank") ? "banking" : "it"}`}>
              Practice Interview for {company.name}
            </Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CompanyDetail;
