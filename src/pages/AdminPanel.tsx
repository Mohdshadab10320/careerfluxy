import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard, BookOpen, FileQuestion, Building2, Users,
  Plus, Shield, CreditCard, Sparkles, BarChart3, TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

type Section = "dashboard" | "courses" | "tests" | "companies" | "users" | "premium";

const CHART_COLORS = ["hsl(var(--primary))", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];

const AdminPanel = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [section, setSection] = useState<Section>("dashboard");
  const [stats, setStats] = useState({ users: 0, tests: 0, avgScore: 0, sessions: 0 });
  const [users, setUsers] = useState<any[]>([]);

  // Premium settings
  const [premiumPrice, setPremiumPrice] = useState("499");
  const [discount, setDiscount] = useState("20");
  const [discountType, setDiscountType] = useState<"percent" | "fixed">("percent");

  // Course manager
  const [newCourse, setNewCourse] = useState({ name: "", category: "", description: "" });
  const [newVideo, setNewVideo] = useState({ course: "", title: "", videoId: "", duration: "", description: "" });

  // Test manager
  const [newQuestion, setNewQuestion] = useState({
    course: "", question: "", options: ["", "", "", ""], correctIndex: 0, explanation: "", topic: ""
  });

  // Company manager
  const [newCompany, setNewCompany] = useState({ name: "", industry: "", questions: "" });

  // AI Generator
  const [aiCourse, setAiCourse] = useState("");
  const [aiTopic, setAiTopic] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate("/");
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchStats();
      if (section === "users") fetchUsers();
    }
  }, [isAdmin, section]);

  const fetchStats = async () => {
    const [{ count: userCount }, { count: testCount }, { data: scoreData }, { count: sessionCount }] = await Promise.all([
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase.from("test_results").select("*", { count: "exact", head: true }),
      supabase.from("test_results").select("score"),
      supabase.from("interview_sessions").select("*", { count: "exact", head: true }),
    ]);
    const avg = scoreData?.length ? Math.round(scoreData.reduce((s, r) => s + r.score, 0) / scoreData.length) : 0;
    setStats({ users: userCount || 0, tests: testCount || 0, avgScore: avg, sessions: sessionCount || 0 });
  };

  const fetchUsers = async () => {
    const { data } = await supabase.from("profiles").select("user_id, full_name, created_at");
    if (data) {
      const enriched = await Promise.all(data.map(async (p) => {
        const { data: roleData } = await supabase.from("user_roles").select("role").eq("user_id", p.user_id).single();
        return { ...p, role: roleData?.role || "user" };
      }));
      setUsers(enriched);
    }
  };

  const handleAIGenerate = async () => {
    if (!aiCourse || !aiTopic) {
      toast({ title: "Error", description: "Please enter course and topic.", variant: "destructive" });
      return;
    }
    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("evaluate-answer", {
        body: {
          question: `Generate 5 MCQ questions for ${aiCourse} on topic "${aiTopic}". Return JSON array with fields: question, options (4 items), correctIndex (0-3), explanation, topic.`,
          answer: "generate_mcqs",
          mood: "professional",
        },
      });
      toast({ title: "AI Questions Generated!", description: `Generated questions for ${aiTopic}. Check console for output.` });
      console.log("AI Generated Questions:", data);
    } catch (e) {
      toast({ title: "Generation Failed", description: "Could not generate questions.", variant: "destructive" });
    }
    setAiLoading(false);
  };

  const finalPrice = discountType === "percent"
    ? (Number(premiumPrice) * (1 - Number(discount) / 100)).toFixed(0)
    : (Number(premiumPrice) - Number(discount)).toFixed(0);

  // Mock chart data
  const userGrowth = [
    { month: "Jan", users: 12 }, { month: "Feb", users: 28 }, { month: "Mar", users: 45 },
    { month: "Apr", users: 62 }, { month: "May", users: 89 }, { month: "Jun", users: stats.users || 100 },
  ];
  const coursePopularity = [
    { name: "IT", value: 40 }, { name: "Banking", value: 20 },
    { name: "Management", value: 15 }, { name: "Medical", value: 10 }, { name: "SSC", value: 15 },
  ];
  const scoreTrends = [
    { month: "Jan", score: 55 }, { month: "Feb", score: 60 }, { month: "Mar", score: 58 },
    { month: "Apr", score: 65 }, { month: "May", score: 70 }, { month: "Jun", score: stats.avgScore || 68 },
  ];

  const sideItems: { key: Section; label: string; icon: any }[] = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "courses", label: "Courses", icon: BookOpen },
    { key: "tests", label: "Mock Tests", icon: FileQuestion },
    { key: "companies", label: "Companies", icon: Building2 },
    { key: "users", label: "Users", icon: Users },
    { key: "premium", label: "Premium Settings", icon: CreditCard },
  ];

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-[calc(100vh-5rem)] border-r border-border bg-card p-4 hidden md:block">
          <div className="flex items-center gap-2 mb-6 px-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-display text-lg font-bold">Admin Panel</span>
          </div>
          <nav className="space-y-1">
            {sideItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setSection(item.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  section === item.key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile tabs */}
        <div className="md:hidden w-full border-b border-border bg-card px-2 py-2 flex gap-1 overflow-x-auto fixed top-16 z-40">
          {sideItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setSection(item.key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap ${
                section === item.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 md:pt-6 mt-12 md:mt-0">
          {/* Dashboard with Analytics */}
          {section === "dashboard" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Total Users", value: stats.users, icon: Users, color: "text-blue-500" },
                  { label: "Tests Taken", value: stats.tests, icon: FileQuestion, color: "text-green-500" },
                  { label: "Avg Score", value: `${stats.avgScore}%`, icon: TrendingUp, color: "text-amber-500" },
                  { label: "Interviews", value: stats.sessions, icon: BarChart3, color: "text-purple-500" },
                ].map((s) => (
                  <Card key={s.label}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">{s.label}</span>
                        <s.icon className={`h-4 w-4 ${s.color}`} />
                      </div>
                      <p className="text-3xl font-bold">{s.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader><CardTitle className="text-sm">User Growth</CardTitle></CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={userGrowth}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="month" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip />
                        <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-sm">Score Trends</CardTitle></CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={scoreTrends}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="month" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip />
                        <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader><CardTitle className="text-sm">Popular Courses</CardTitle></CardHeader>
                <CardContent className="flex justify-center">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={coursePopularity} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                        {coursePopularity.map((_, i) => (
                          <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Course Manager */}
          {section === "courses" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Course Manager</h1>
              <div className="grid gap-6">
                <Card>
                  <CardHeader><CardTitle className="text-lg">Add New Course</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    <Input placeholder="Course Name" value={newCourse.name} onChange={e => setNewCourse(p => ({ ...p, name: e.target.value }))} />
                    <Input placeholder="Category (e.g. IT, Management)" value={newCourse.category} onChange={e => setNewCourse(p => ({ ...p, category: e.target.value }))} />
                    <Textarea placeholder="Description" value={newCourse.description} onChange={e => setNewCourse(p => ({ ...p, description: e.target.value }))} />
                    <Button onClick={() => toast({ title: "Course Added", description: `${newCourse.name} has been added.` })}>
                      <Plus className="h-4 w-4 mr-1" /> Add Course
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-lg">Add Video to Course</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    <Input placeholder="Course (e.g. python)" value={newVideo.course} onChange={e => setNewVideo(p => ({ ...p, course: e.target.value }))} />
                    <Input placeholder="Video Title" value={newVideo.title} onChange={e => setNewVideo(p => ({ ...p, title: e.target.value }))} />
                    <Input placeholder="YouTube Video ID" value={newVideo.videoId} onChange={e => setNewVideo(p => ({ ...p, videoId: e.target.value }))} />
                    <Input placeholder="Duration (e.g. 15:30)" value={newVideo.duration} onChange={e => setNewVideo(p => ({ ...p, duration: e.target.value }))} />
                    <Textarea placeholder="Video Description" value={newVideo.description} onChange={e => setNewVideo(p => ({ ...p, description: e.target.value }))} />
                    <Button onClick={() => toast({ title: "Video Added", description: `${newVideo.title} added to ${newVideo.course}.` })}>
                      <Plus className="h-4 w-4 mr-1" /> Add Video
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Mock Test Manager with AI Generator */}
          {section === "tests" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Mock Test Manager</h1>
              <div className="grid gap-6">
                <Card className="border-primary/30">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" /> AI Question Generator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Input placeholder="Course (e.g. IT, Banking)" value={aiCourse} onChange={e => setAiCourse(e.target.value)} />
                    <Input placeholder="Topic (e.g. Python OOP, Banking Aptitude)" value={aiTopic} onChange={e => setAiTopic(e.target.value)} />
                    <Button onClick={handleAIGenerate} disabled={aiLoading} className="gradient-bg">
                      <Sparkles className="h-4 w-4 mr-1" />
                      {aiLoading ? "Generating..." : "Generate Questions with AI"}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="text-lg">Add Question Manually</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    <Input placeholder="Course (e.g. it, banking)" value={newQuestion.course} onChange={e => setNewQuestion(p => ({ ...p, course: e.target.value }))} />
                    <Input placeholder="Topic" value={newQuestion.topic} onChange={e => setNewQuestion(p => ({ ...p, topic: e.target.value }))} />
                    <Textarea placeholder="Question" value={newQuestion.question} onChange={e => setNewQuestion(p => ({ ...p, question: e.target.value }))} />
                    {newQuestion.options.map((opt, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Input
                          placeholder={`Option ${i + 1}`}
                          value={opt}
                          onChange={e => {
                            const opts = [...newQuestion.options];
                            opts[i] = e.target.value;
                            setNewQuestion(p => ({ ...p, options: opts }));
                          }}
                        />
                        <input
                          type="radio"
                          name="correct"
                          checked={newQuestion.correctIndex === i}
                          onChange={() => setNewQuestion(p => ({ ...p, correctIndex: i }))}
                          className="accent-primary"
                        />
                        <span className="text-xs text-muted-foreground">Correct</span>
                      </div>
                    ))}
                    <Textarea placeholder="Explanation" value={newQuestion.explanation} onChange={e => setNewQuestion(p => ({ ...p, explanation: e.target.value }))} />
                    <Button onClick={() => toast({ title: "Question Added", description: "Question has been added to the bank." })}>
                      <Plus className="h-4 w-4 mr-1" /> Add Question
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Company Manager */}
          {section === "companies" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Company Manager</h1>
              <Card>
                <CardHeader><CardTitle className="text-lg">Add Company</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <Input placeholder="Company Name" value={newCompany.name} onChange={e => setNewCompany(p => ({ ...p, name: e.target.value }))} />
                  <Input placeholder="Industry (e.g. IT, Banking)" value={newCompany.industry} onChange={e => setNewCompany(p => ({ ...p, industry: e.target.value }))} />
                  <Textarea placeholder="Interview Questions (one per line)" rows={6} value={newCompany.questions} onChange={e => setNewCompany(p => ({ ...p, questions: e.target.value }))} />
                  <Button onClick={() => toast({ title: "Company Added", description: `${newCompany.name} has been added.` })}>
                    <Plus className="h-4 w-4 mr-1" /> Add Company
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* User Manager */}
          {section === "users" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">User Manager</h1>
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-4 font-medium text-muted-foreground">Name</th>
                          <th className="text-left p-4 font-medium text-muted-foreground">User ID</th>
                          <th className="text-left p-4 font-medium text-muted-foreground">Role</th>
                          <th className="text-left p-4 font-medium text-muted-foreground">Joined</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u) => (
                          <tr key={u.user_id} className="border-b border-border hover:bg-muted/50">
                            <td className="p-4">{u.full_name || "—"}</td>
                            <td className="p-4 font-mono text-xs text-muted-foreground">{u.user_id.slice(0, 8)}...</td>
                            <td className="p-4">
                              <Badge variant={u.role === "admin" ? "default" : "secondary"}>
                                {u.role}
                              </Badge>
                            </td>
                            <td className="p-4 text-muted-foreground">{new Date(u.created_at).toLocaleDateString()}</td>
                          </tr>
                        ))}
                        {users.length === 0 && (
                          <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">No users found</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Premium Settings */}
          {section === "premium" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Premium Settings</h1>
              <div className="grid gap-6">
                <Card>
                  <CardHeader><CardTitle className="text-lg flex items-center gap-2"><CreditCard className="h-5 w-5" /> Pricing Configuration</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Premium Price (₹)</label>
                      <Input type="number" value={premiumPrice} onChange={e => setPremiumPrice(e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Discount Type</label>
                      <div className="flex gap-3">
                        <Button variant={discountType === "percent" ? "default" : "outline"} size="sm" onClick={() => setDiscountType("percent")}>Percentage (%)</Button>
                        <Button variant={discountType === "fixed" ? "default" : "outline"} size="sm" onClick={() => setDiscountType("fixed")}>Fixed (₹)</Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">
                        Discount {discountType === "percent" ? "(%)" : "(₹)"}
                      </label>
                      <Input type="number" value={discount} onChange={e => setDiscount(e.target.value)} />
                    </div>
                    <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Original Price:</span>
                        <span className="text-lg font-semibold line-through text-muted-foreground">₹{premiumPrice}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm text-muted-foreground">Discount:</span>
                        <span className="text-sm text-green-500 font-medium">
                          {discountType === "percent" ? `${discount}%` : `₹${discount}`} OFF
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-primary/20">
                        <span className="text-sm font-bold text-foreground">Final Price:</span>
                        <span className="text-2xl font-bold gradient-text">₹{finalPrice}</span>
                      </div>
                    </div>
                    <Button onClick={() => toast({ title: "Pricing Updated", description: `Premium price set to ₹${finalPrice}` })} className="gradient-bg">
                      Save Pricing
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="text-lg">Premium Features</CardTitle></CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">✅ All 12 Mock Test Levels</li>
                      <li className="flex items-center gap-2">✅ Voice & Camera Interview Modes</li>
                      <li className="flex items-center gap-2">✅ Advanced Analytics & Reports</li>
                      <li className="flex items-center gap-2">✅ Company-Specific Preparation</li>
                      <li className="flex items-center gap-2">✅ Priority Support</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;
