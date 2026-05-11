import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Download, TrendingUp, Target, Lightbulb } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const ReportCard = () => {
  const { user, profile } = useAuth();
  const [sessions, setSessions] = useState<any[]>([]);
  const [tests, setTests] = useState<any[]>([]);
  const [certs, setCerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { (async () => {
    if (!user) { setLoading(false); return; }
    const [{ data: s }, { data: t }, { data: c }] = await Promise.all([
      supabase.from("interview_sessions").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(20),
      supabase.from("test_results").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(20),
      supabase.from("certificates").select("*").eq("user_id", user.id).order("issued_at", { ascending: false }),
    ]);
    setSessions(s || []); setTests(t || []); setCerts(c || []);
    setLoading(false);
  })(); }, [user]);

  const avgInterview = sessions.length ? Math.round((sessions.reduce((a, b) => a + (b.score || 0), 0) / sessions.length) * 10) : 0;
  const avgTest = tests.length ? Math.round(tests.reduce((a, b) => a + (b.score || 0), 0) / tests.length) : 0;
  const overall = Math.round((avgInterview + avgTest) / (avgInterview && avgTest ? 2 : 1)) || 0;

  const skillAvg = (key: string) => {
    const vals = sessions.map(s => s.feedback?.skills?.[key]).filter(Boolean);
    return vals.length ? Math.round(vals.reduce((a: number, b: number) => a + b, 0) / vals.length) : 0;
  };

  const generateCertificate = async () => {
    if (!user || overall < 60) { toast.error("Score 60+ required for certificate"); return; }
    const fullName = profile?.full_name || user.email?.split("@")[0] || "Student";
    const cert = { user_id: user.id, full_name: fullName, course: profile?.career_path || "Interview Mastery", score: overall, total: 100, level: overall >= 85 ? "Expert" : overall >= 70 ? "Proficient" : "Competent" };
    const { data } = await supabase.from("certificates").insert(cert).select().maybeSingle();
    if (data) {
      setCerts(p => [data, ...p]);
      await supabase.from("user_badges").insert({ user_id: user.id, badge_code: "certified" }).then(() => {});
      downloadCertificate(data);
      toast.success("Certificate generated!");
    }
  };

  const downloadCertificate = (cert: any) => {
    const date = new Date(cert.issued_at).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
    const html = `<!DOCTYPE html><html><head><title>Certificate</title><style>
      body{margin:0;font-family:Georgia,serif;background:#f5f5f5;display:flex;align-items:center;justify-content:center;min-height:100vh;}
      .cert{width:1000px;padding:60px;background:linear-gradient(135deg,#fff,#f0f4ff);border:12px double #6366f1;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.15);}
      h1{font-size:48px;margin:0;color:#1e1b4b;letter-spacing:4px;}
      .sub{color:#6366f1;letter-spacing:8px;font-size:14px;margin:8px 0 40px;}
      .name{font-size:42px;color:#0f172a;margin:20px 0;border-bottom:2px solid #6366f1;display:inline-block;padding:8px 40px;}
      .body{font-size:18px;color:#475569;line-height:1.7;margin:30px auto;max-width:700px;}
      .meta{display:flex;justify-content:space-around;margin-top:60px;font-size:14px;color:#475569;}
      .meta div b{display:block;font-size:20px;color:#1e1b4b;margin-bottom:4px;}
      .seal{margin-top:30px;font-size:12px;color:#6366f1;letter-spacing:3px;}
      @media print{body{background:white;}.no-print{display:none;}}
    </style></head><body>
      <div class="cert">
        <h1>CERTIFICATE</h1><div class="sub">OF ACHIEVEMENT</div>
        <div>This is proudly presented to</div>
        <div class="name">${cert.full_name}</div>
        <div class="body">For successfully completing the <strong>${cert.course}</strong> interview preparation program on CareerFluxy with a performance score of <strong>${cert.score}/100</strong> at <strong>${cert.level}</strong> level.</div>
        <div class="meta">
          <div><b>${cert.score}/100</b>Final Score</div>
          <div><b>${cert.level}</b>Level</div>
          <div><b>${date}</b>Issued On</div>
        </div>
        <div class="seal">★ CAREERFLUXY • OFFICIAL CERTIFICATE ★</div>
      </div>
      <button class="no-print" style="position:fixed;top:20px;right:20px;padding:10px 20px;" onclick="window.print()">Print / Save as PDF</button>
    </body></html>`;
    const w = window.open("", "_blank");
    if (w) { w.document.write(html); w.document.close(); }
  };

  if (loading) return (<div className="min-h-screen bg-background"><Navbar /><div className="container mx-auto px-4 pt-24">Loading...</div></div>);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold flex items-center gap-3">
            <Award className="h-8 w-8 text-primary" /> Mock <span className="gradient-text">Report Card</span>
          </h1>
          <p className="text-muted-foreground mt-2">Your overall performance, strengths, and downloadable certificate.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-card rounded-2xl border border-border p-6 lg:col-span-1 text-center">
            <div className="text-6xl font-bold gradient-text">{overall}</div>
            <div className="text-sm text-muted-foreground mt-1">Overall Score / 100</div>
            <Badge className="mt-3 gradient-bg border-0 text-primary-foreground">{overall >= 85 ? "Expert" : overall >= 70 ? "Proficient" : overall >= 50 ? "Competent" : "Beginner"}</Badge>
            <Button onClick={generateCertificate} disabled={overall < 60} className="w-full mt-4 gradient-bg border-0 text-primary-foreground">
              <Download className="h-4 w-4 mr-2" /> Generate Certificate
            </Button>
            {overall < 60 && <p className="text-xs text-muted-foreground mt-2">Score 60+ required</p>}
          </div>

          <div className="bg-card rounded-2xl border border-border p-6 lg:col-span-2 space-y-3">
            <h3 className="font-semibold flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Skill Breakdown</h3>
            {[["Communication", "communication"], ["Technical", "technical"], ["Confidence", "confidence"], ["Structure", "structure"]].map(([label, key]) => (
              <div key={key}><div className="flex justify-between text-sm mb-1"><span>{label}</span><span>{skillAvg(key)}/100</span></div><Progress value={skillAvg(key)} /></div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-semibold flex items-center gap-2 mb-3"><Target className="h-4 w-4 text-green-500" /> Strengths</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {avgInterview >= 70 && <li>• Strong interview performance ({avgInterview}/100 avg)</li>}
              {avgTest >= 70 && <li>• Excellent test scores ({avgTest}% avg)</li>}
              {skillAvg("communication") >= 70 && <li>• Confident communication skills</li>}
              {skillAvg("technical") >= 70 && <li>• Solid technical knowledge</li>}
              {sessions.length >= 5 && <li>• Consistent practice ({sessions.length} sessions)</li>}
              {sessions.length === 0 && tests.length === 0 && <li>Take some tests/interviews to see your strengths</li>}
            </ul>
          </div>
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-semibold flex items-center gap-2 mb-3"><Lightbulb className="h-4 w-4 text-yellow-500" /> Improvement Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {skillAvg("communication") < 70 && skillAvg("communication") > 0 && <li>• Practice spoken English daily</li>}
              {skillAvg("technical") < 70 && skillAvg("technical") > 0 && <li>• Revise core technical concepts</li>}
              {skillAvg("confidence") < 70 && skillAvg("confidence") > 0 && <li>• Try voice/camera mode interviews</li>}
              {sessions.length < 5 && <li>• Complete more interview sessions</li>}
              {avgTest < 70 && tests.length > 0 && <li>• Retake mock tests to improve scores</li>}
            </ul>
          </div>
        </div>

        {certs.length > 0 && (
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2"><Award className="h-4 w-4" /> Your Certificates</h3>
            <div className="space-y-2">
              {certs.map(c => (
                <div key={c.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
                  <div>
                    <div className="font-semibold text-sm">{c.course} — {c.level}</div>
                    <div className="text-xs text-muted-foreground">Score {c.score}/{c.total} • {new Date(c.issued_at).toLocaleDateString()}</div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => downloadCertificate(c)}><Download className="h-4 w-4 mr-1" /> Download</Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ReportCard;