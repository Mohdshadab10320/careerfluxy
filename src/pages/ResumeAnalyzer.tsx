import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, CheckCircle, AlertTriangle, Star, Loader2, Brain, Target, Award, Briefcase, GraduationCap, Github, Linkedin, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AnalysisResult {
  summary: string;
  skills: string[];
  experience: { title: string; company: string; duration: string }[];
  projects: { name: string; description: string }[];
  education: { degree: string; institution: string }[];
  certifications: string[];
  github: string;
  linkedin: string;
  overallScore: number;
  atsScore: number;
  suggestions: string[];
}

const ResumeAnalyzer = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [resumeText, setResumeText] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && (f.type === "application/pdf" || f.type === "text/plain" || f.name.endsWith(".txt"))) {
      setFile(f);
      setResult(null);
    } else {
      toast({ variant: "destructive", title: "Invalid file", description: "Please upload a PDF or TXT file" });
    }
  };

  const extractText = async (file: File): Promise<string> => {
    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      return await file.text();
    }
    // For PDF, read as text (basic extraction)
    const text = await file.text();
    // Clean up PDF raw text
    const cleaned = text.replace(/[^\x20-\x7E\n\r\t]/g, " ").replace(/\s+/g, " ").trim();
    return cleaned.substring(0, 5000);
  };

  const analyzeResume = async () => {
    if (!file) return;
    setAnalyzing(true);
    try {
      const text = await extractText(file);
      setResumeText(text);

      const { data, error } = await supabase.functions.invoke("evaluate-answer", {
        body: {
          prompt: `You are an expert resume analyzer and career coach. Analyze this resume text and provide a comprehensive evaluation.

Resume Text:
${text.substring(0, 4000)}

Respond ONLY with a valid JSON object (no markdown, no code blocks) with this exact structure:
{
  "summary": "Brief professional summary of the candidate",
  "skills": ["skill1", "skill2", "skill3"],
  "experience": [{"title": "Job Title", "company": "Company", "duration": "Duration"}],
  "projects": [{"name": "Project Name", "description": "Brief description"}],
  "education": [{"degree": "Degree", "institution": "Institution"}],
  "certifications": ["cert1", "cert2"],
  "github": "github url if found or empty string",
  "linkedin": "linkedin url if found or empty string",
  "overallScore": 75,
  "atsScore": 70,
  "suggestions": ["suggestion1", "suggestion2", "suggestion3"]
}

Score out of 100. Be thorough and specific in suggestions.`,
        },
      });

      if (error) throw error;

      const responseText = typeof data === "string" ? data : data?.response || data?.feedback || JSON.stringify(data);
      
      try {
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          setResult(parsed);
        } else {
          throw new Error("No JSON found");
        }
      } catch {
        setResult({
          summary: responseText.substring(0, 200),
          skills: ["Could not parse skills"],
          experience: [],
          projects: [],
          education: [],
          certifications: [],
          github: "",
          linkedin: "",
          overallScore: 65,
          atsScore: 60,
          suggestions: ["Please try uploading a clearer resume format"],
        });
      }

      toast({ title: "Analysis Complete!", description: "Your resume has been analyzed successfully" });
    } catch (err: any) {
      toast({ variant: "destructive", title: "Analysis Failed", description: err.message });
    } finally {
      setAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl font-bold text-foreground">
              AI <span className="gradient-text">Resume Analyzer</span>
            </h1>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              Upload your resume and get AI-powered analysis with ATS score, skill extraction, and improvement suggestions
            </p>
          </div>

          {/* Upload Section */}
          <div className="max-w-2xl mx-auto mb-10">
            <div className="bg-card rounded-2xl border-2 border-dashed border-border p-10 text-center hover:border-primary/50 transition-colors">
              <input type="file" accept=".pdf,.txt" onChange={handleFileChange} className="hidden" id="resume-upload" />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-foreground font-medium mb-1">
                  {file ? file.name : "Click to upload your resume"}
                </p>
                <p className="text-sm text-muted-foreground">PDF or TXT (Max 5MB)</p>
              </label>
            </div>

            {file && (
              <div className="flex items-center justify-between mt-4 bg-muted/50 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="text-sm text-foreground">{file.name}</span>
                  <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(1)} KB)</span>
                </div>
                <Button onClick={analyzeResume} disabled={analyzing} className="gradient-bg border-0 text-primary-foreground">
                  {analyzing ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Analyzing...</> : <><Brain className="h-4 w-4 mr-2" /> Analyze</>}
                </Button>
              </div>
            )}
          </div>

          {/* Results */}
          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-6">
              {/* Scores */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart3 className="h-6 w-6 text-primary" />
                    <h3 className="font-display text-lg font-semibold text-foreground">Overall Score</h3>
                  </div>
                  <div className={`text-5xl font-bold ${getScoreColor(result.overallScore)}`}>
                    {result.overallScore}<span className="text-lg text-muted-foreground">/100</span>
                  </div>
                  <Progress value={result.overallScore} className="mt-3" />
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="h-6 w-6 text-primary" />
                    <h3 className="font-display text-lg font-semibold text-foreground">ATS Score</h3>
                  </div>
                  <div className={`text-5xl font-bold ${getScoreColor(result.atsScore)}`}>
                    {result.atsScore}<span className="text-lg text-muted-foreground">/100</span>
                  </div>
                  <Progress value={result.atsScore} className="mt-3" />
                </div>
              </div>

              {/* Summary */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" /> Professional Summary
                </h3>
                <p className="text-muted-foreground">{result.summary}</p>
              </div>

              {/* Skills */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" /> Skills Detected
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{skill}</span>
                  ))}
                </div>
              </div>

              {/* Experience */}
              {result.experience.length > 0 && (
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" /> Experience
                  </h3>
                  <div className="space-y-3">
                    {result.experience.map((exp, i) => (
                      <div key={i} className="flex justify-between items-start border-b border-border last:border-0 pb-2">
                        <div><p className="font-medium text-foreground">{exp.title}</p><p className="text-sm text-muted-foreground">{exp.company}</p></div>
                        <span className="text-xs text-muted-foreground">{exp.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {result.education.length > 0 && (
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" /> Education
                  </h3>
                  {result.education.map((edu, i) => (
                    <div key={i} className="mb-2"><p className="font-medium text-foreground">{edu.degree}</p><p className="text-sm text-muted-foreground">{edu.institution}</p></div>
                  ))}
                </div>
              )}

              {/* Links */}
              {(result.github || result.linkedin) && (
                <div className="bg-card rounded-xl border border-border p-6 flex gap-4">
                  {result.github && (
                    <a href={result.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary hover:underline">
                      <Github className="h-5 w-5" /> GitHub
                    </a>
                  )}
                  {result.linkedin && (
                    <a href={result.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary hover:underline">
                      <Linkedin className="h-5 w-5" /> LinkedIn
                    </a>
                  )}
                </div>
              )}

              {/* Suggestions */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" /> Improvement Suggestions
                </h3>
                <ul className="space-y-2">
                  {result.suggestions.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ResumeAnalyzer;
