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
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog";
import {
  LayoutDashboard, BookOpen, FileQuestion, Building2, Users,
  Plus, Shield, CreditCard, Sparkles, BarChart3, TrendingUp,
  Video, Ticket, Settings, Trash2, Edit, UserCog
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

type Section = "dashboard" | "courses" | "videos" | "tests" | "companies" | "users" | "pricing" | "coupons" | "settings";

const CHART_COLORS = ["hsl(var(--primary))", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];

const AdminPanel = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [section, setSection] = useState<Section>("dashboard");
  const [stats, setStats] = useState({ users: 0, tests: 0, avgScore: 0, sessions: 0 });
  const [users, setUsers] = useState<any[]>([]);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; type: string; id: string; label: string }>({ open: false, type: "", id: "", label: "" });

  // Coupons
  const [coupons, setCoupons] = useState<any[]>([]);
  const [couponForm, setCouponForm] = useState({ code: "", type: "percent", value: "", expiry_date: "", usage_limit: "", active: true });
  const [editingCoupon, setEditingCoupon] = useState<string | null>(null);

  // Settings
  const [siteSettings, setSiteSettings] = useState<Record<string, string>>({});
  const [settingsLoading, setSettingsLoading] = useState(false);

  // Premium
  const [premiumPrice, setPremiumPrice] = useState("499");
  const [discount, setDiscount] = useState("0");
  const [discountType, setDiscountType] = useState<"percent" | "fixed">("percent");

  // Course manager
  const [newCourse, setNewCourse] = useState({ name: "", category: "", description: "" });
  const [newVideo, setNewVideo] = useState({ course: "", title: "", videoId: "", duration: "", description: "", topic: "" });

  // Test manager
  const [newQuestion, setNewQuestion] = useState({
    course: "", question: "", options: ["", "", "", ""], correctIndex: 0, explanation: "", topic: "", level: "1"
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
      if (section === "coupons") fetchCoupons();
      if (section === "settings" || section === "pricing") fetchSettings();
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

  const toggleUserRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    const { error } = await supabase.from("user_roles").update({ role: newRole }).eq("user_id", userId);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Role Updated", description: `User is now ${newRole}.` });
      fetchUsers();
    }
  };

  const fetchCoupons = async () => {
    const { data } = await supabase.from("coupons").select("*").order("created_at", { ascending: false });
    if (data) setCoupons(data);
  };

  const saveCoupon = async () => {
    if (!couponForm.code || !couponForm.value) {
      toast({ title: "Error", description: "Code and value are required.", variant: "destructive" });
      return;
    }
    const payload = {
      code: couponForm.code.toUpperCase(),
      type: couponForm.type,
      value: Number(couponForm.value),
      expiry_date: couponForm.expiry_date || null,
      usage_limit: couponForm.usage_limit ? Number(couponForm.usage_limit) : null,
      active: couponForm.active,
    };

    if (editingCoupon) {
      const { error } = await supabase.from("coupons").update(payload).eq("id", editingCoupon);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Coupon Updated" });
      setEditingCoupon(null);
    } else {
      const { error } = await supabase.from("coupons").insert(payload);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Coupon Created", description: `Code: ${payload.code}` });
    }
    setCouponForm({ code: "", type: "percent", value: "", expiry_date: "", usage_limit: "", active: true });
    fetchCoupons();
  };

  const deleteCoupon = async (id: string) => {
    await supabase.from("coupons").delete().eq("id", id);
    toast({ title: "Coupon Deleted" });
    fetchCoupons();
    setDeleteDialog({ open: false, type: "", id: "", label: "" });
  };

  const fetchSettings = async () => {
    const { data } = await supabase.from("site_settings").select("*");
    if (data) {
      const map: Record<string, string> = {};
      data.forEach((s: any) => { map[s.key] = s.value; });
      setSiteSettings(map);
      if (map.premium_price) setPremiumPrice(map.premium_price);
      if (map.premium_discount) setDiscount(map.premium_discount);
      if (map.premium_discount_type) setDiscountType(map.premium_discount_type as "percent" | "fixed");
    }
  };

  const updateSetting = async (key: string, value: string) => {
    setSiteSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = async () => {
    setSettingsLoading(true);
    for (const [key, value] of Object.entries(siteSettings)) {
      await supabase.from("site_settings").update({ value, updated_at: new Date().toISOString() }).eq("key", key);
    }
    toast({ title: "Settings Saved", description: "All settings updated successfully." });
    setSettingsLoading(false);
  };

  const savePricing = async () => {
    await Promise.all([
      supabase.from("site_settings").update({ value: premiumPrice }).eq("key", "premium_price"),
      supabase.from("site_settings").update({ value: discount }).eq("key", "premium_discount"),
      supabase.from("site_settings").update({ value: discountType }).eq("key", "premium_discount_type"),
    ]);
    toast({ title: "Pricing Updated", description: `Premium price set to ₹${finalPrice}` });
  };

  const handleAIGenerate = async () => {
    if (!aiCourse || !aiTopic) {
      toast({ title: "Error", description: "Please enter course and topic.", variant: "destructive" });
      return;
    }
    setAiLoading(true);
    try {
      const { data } = await supabase.functions.invoke("evaluate-answer", {
        body: {
          question: `Generate 5 MCQ questions for ${aiCourse} on topic "${aiTopic}". Return JSON array with fields: question, options (4 items), correctIndex (0-3), explanation, topic.`,
          answer: "generate_mcqs",
          mood: "professional",
        },
      });
      toast({ title: "AI Questions Generated!", description: `Generated questions for ${aiTopic}. Check console for output.` });
      console.log("AI Generated Questions:", data);
    } catch {
      toast({ title: "Generation Failed", description: "Could not generate questions.", variant: "destructive" });
    }
    setAiLoading(false);
  };

  const finalPrice = discountType === "percent"
    ? (Number(premiumPrice) * (1 - Number(discount) / 100)).toFixed(0)
    : (Number(premiumPrice) - Number(discount)).toFixed(0);

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
    { key: "dashboard", label: "📊 Dashboard", icon: LayoutDashboard },
    { key: "courses", label: "📚 Courses", icon: BookOpen },
    { key: "videos", label: "🎥 Videos", icon: Video },
    { key: "tests", label: "📝 Mock Tests", icon: FileQuestion },
    { key: "companies", label: "🏢 Companies", icon: Building2 },
    { key: "users", label: "👥 Users", icon: Users },
    { key: "pricing", label: "💰 Pricing", icon: CreditCard },
    { key: "coupons", label: "🎟️ Coupons", icon: Ticket },
    { key: "settings", label: "⚙️ Settings", icon: Settings },
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
            <span className="font-display text-lg font-bold">Super Admin</span>
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

          {/* ── DASHBOARD ── */}
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
                        {coursePopularity.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ── COURSES ── */}
          {section === "courses" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Course Manager</h1>
              <Card>
                <CardHeader><CardTitle className="text-lg">Add New Course / Sub-topic</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <Input placeholder="Course Category (e.g. IT, Management, Medical)" value={newCourse.category} onChange={e => setNewCourse(p => ({ ...p, category: e.target.value }))} />
                  <Input placeholder="Sub-topic Name (e.g. Python, HR, Tally)" value={newCourse.name} onChange={e => setNewCourse(p => ({ ...p, name: e.target.value }))} />
                  <Textarea placeholder="Description" value={newCourse.description} onChange={e => setNewCourse(p => ({ ...p, description: e.target.value }))} />
                  <Button onClick={() => { toast({ title: "Course Added", description: `${newCourse.name} added to ${newCourse.category}` }); setNewCourse({ name: "", category: "", description: "" }); }}>
                    <Plus className="h-4 w-4 mr-1" /> Add Course
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ── VIDEOS ── */}
          {section === "videos" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Video Manager</h1>
              <Card>
                <CardHeader><CardTitle className="text-lg">Add Video</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <Input placeholder="Course (e.g. it, management)" value={newVideo.course} onChange={e => setNewVideo(p => ({ ...p, course: e.target.value }))} />
                  <Input placeholder="Topic (e.g. python, hr)" value={newVideo.topic} onChange={e => setNewVideo(p => ({ ...p, topic: e.target.value }))} />
                  <Input placeholder="Video Title" value={newVideo.title} onChange={e => setNewVideo(p => ({ ...p, title: e.target.value }))} />
                  <Input placeholder="YouTube Video ID or URL" value={newVideo.videoId} onChange={e => setNewVideo(p => ({ ...p, videoId: e.target.value }))} />
                  <Input placeholder="Duration (e.g. 15:30)" value={newVideo.duration} onChange={e => setNewVideo(p => ({ ...p, duration: e.target.value }))} />
                  <Textarea placeholder="Video Description" value={newVideo.description} onChange={e => setNewVideo(p => ({ ...p, description: e.target.value }))} />
                  <Button onClick={() => { toast({ title: "Video Added", description: `${newVideo.title} added to ${newVideo.course}/${newVideo.topic}` }); setNewVideo({ course: "", title: "", videoId: "", duration: "", description: "", topic: "" }); }}>
                    <Plus className="h-4 w-4 mr-1" /> Add Video
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ── MOCK TESTS ── */}
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
                    <Input placeholder="Topic (e.g. Python OOP)" value={aiTopic} onChange={e => setAiTopic(e.target.value)} />
                    <Button onClick={handleAIGenerate} disabled={aiLoading} className="gradient-bg">
                      <Sparkles className="h-4 w-4 mr-1" />
                      {aiLoading ? "Generating..." : "Generate Questions with AI"}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="text-lg">Add Question Manually</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Input placeholder="Course (e.g. it)" value={newQuestion.course} onChange={e => setNewQuestion(p => ({ ...p, course: e.target.value }))} />
                      <Input placeholder="Level (1-12)" value={newQuestion.level} onChange={e => setNewQuestion(p => ({ ...p, level: e.target.value }))} />
                    </div>
                    <Input placeholder="Topic" value={newQuestion.topic} onChange={e => setNewQuestion(p => ({ ...p, topic: e.target.value }))} />
                    <Textarea placeholder="Question" value={newQuestion.question} onChange={e => setNewQuestion(p => ({ ...p, question: e.target.value }))} />
                    {newQuestion.options.map((opt, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Input placeholder={`Option ${i + 1}`} value={opt} onChange={e => { const opts = [...newQuestion.options]; opts[i] = e.target.value; setNewQuestion(p => ({ ...p, options: opts })); }} />
                        <input type="radio" name="correct" checked={newQuestion.correctIndex === i} onChange={() => setNewQuestion(p => ({ ...p, correctIndex: i }))} className="accent-primary" />
                        <span className="text-xs text-muted-foreground whitespace-nowrap">Correct</span>
                      </div>
                    ))}
                    <Textarea placeholder="Explanation" value={newQuestion.explanation} onChange={e => setNewQuestion(p => ({ ...p, explanation: e.target.value }))} />
                    <Button onClick={() => { toast({ title: "Question Added" }); setNewQuestion({ course: "", question: "", options: ["", "", "", ""], correctIndex: 0, explanation: "", topic: "", level: "1" }); }}>
                      <Plus className="h-4 w-4 mr-1" /> Add Question
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* ── COMPANIES ── */}
          {section === "companies" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Company Manager</h1>
              <Card>
                <CardHeader><CardTitle className="text-lg">Add Company</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <Input placeholder="Company Name" value={newCompany.name} onChange={e => setNewCompany(p => ({ ...p, name: e.target.value }))} />
                  <Input placeholder="Industry (e.g. IT, Banking)" value={newCompany.industry} onChange={e => setNewCompany(p => ({ ...p, industry: e.target.value }))} />
                  <Textarea placeholder="Interview Questions (one per line)" rows={6} value={newCompany.questions} onChange={e => setNewCompany(p => ({ ...p, questions: e.target.value }))} />
                  <Button onClick={() => { toast({ title: "Company Added", description: `${newCompany.name} added.` }); setNewCompany({ name: "", industry: "", questions: "" }); }}>
                    <Plus className="h-4 w-4 mr-1" /> Add Company
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ── USERS ── */}
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
                          <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u) => (
                          <tr key={u.user_id} className="border-b border-border hover:bg-muted/50">
                            <td className="p-4">{u.full_name || "—"}</td>
                            <td className="p-4 font-mono text-xs text-muted-foreground">{u.user_id.slice(0, 8)}...</td>
                            <td className="p-4">
                              <Badge variant={u.role === "admin" ? "default" : "secondary"}>{u.role}</Badge>
                            </td>
                            <td className="p-4 text-muted-foreground">{new Date(u.created_at).toLocaleDateString()}</td>
                            <td className="p-4">
                              <Button size="sm" variant={u.role === "admin" ? "destructive" : "outline"} onClick={() => toggleUserRole(u.user_id, u.role)}>
                                <UserCog className="h-3.5 w-3.5 mr-1" />
                                {u.role === "admin" ? "Remove Admin" : "Make Admin"}
                              </Button>
                            </td>
                          </tr>
                        ))}
                        {users.length === 0 && (
                          <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No users found</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ── PRICING ── */}
          {section === "pricing" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Pricing Control</h1>
              <div className="grid gap-6">
                <Card>
                  <CardHeader><CardTitle className="text-lg flex items-center gap-2"><CreditCard className="h-5 w-5" /> Premium Pricing</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Premium Price (₹)</label>
                      <Input type="number" value={premiumPrice} onChange={e => setPremiumPrice(e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Discount Type</label>
                      <div className="flex gap-3">
                        <Button variant={discountType === "percent" ? "default" : "outline"} size="sm" onClick={() => setDiscountType("percent")}>Percentage (%)</Button>
                        <Button variant={discountType === "fixed" ? "default" : "outline"} size="sm" onClick={() => setDiscountType("fixed")}>Fixed (₹)</Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Discount {discountType === "percent" ? "(%)" : "(₹)"}</label>
                      <Input type="number" value={discount} onChange={e => setDiscount(e.target.value)} />
                    </div>
                    <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Original:</span>
                        <span className="text-lg font-semibold line-through text-muted-foreground">₹{premiumPrice}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm text-muted-foreground">Discount:</span>
                        <span className="text-sm text-green-500 font-medium">{discountType === "percent" ? `${discount}%` : `₹${discount}`} OFF</span>
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-primary/20">
                        <span className="text-sm font-bold">Final Price:</span>
                        <span className="text-2xl font-bold gradient-text">₹{finalPrice}</span>
                      </div>
                    </div>
                    <Button onClick={savePricing} className="gradient-bg">Save Pricing to Database</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-lg">Premium Features</CardTitle></CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✅ All 12 Mock Test Levels</li>
                      <li>✅ Voice & Camera Interview Modes</li>
                      <li>✅ Advanced Analytics & Reports</li>
                      <li>✅ Company-Specific Preparation</li>
                      <li>✅ Priority Support</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* ── COUPONS ── */}
          {section === "coupons" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Coupon Manager</h1>
              <div className="grid gap-6">
                <Card>
                  <CardHeader><CardTitle className="text-lg">{editingCoupon ? "Edit Coupon" : "Create Coupon"}</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    <Input placeholder="Coupon Code (e.g. SAVE20)" value={couponForm.code} onChange={e => setCouponForm(p => ({ ...p, code: e.target.value }))} />
                    <div className="flex gap-3">
                      <Button variant={couponForm.type === "percent" ? "default" : "outline"} size="sm" onClick={() => setCouponForm(p => ({ ...p, type: "percent" }))}>Percentage (%)</Button>
                      <Button variant={couponForm.type === "fixed" ? "default" : "outline"} size="sm" onClick={() => setCouponForm(p => ({ ...p, type: "fixed" }))}>Fixed (₹)</Button>
                    </div>
                    <Input placeholder="Value" type="number" value={couponForm.value} onChange={e => setCouponForm(p => ({ ...p, value: e.target.value }))} />
                    <Input placeholder="Expiry Date" type="date" value={couponForm.expiry_date} onChange={e => setCouponForm(p => ({ ...p, expiry_date: e.target.value }))} />
                    <Input placeholder="Usage Limit (leave empty for unlimited)" type="number" value={couponForm.usage_limit} onChange={e => setCouponForm(p => ({ ...p, usage_limit: e.target.value }))} />
                    <div className="flex items-center gap-2">
                      <Switch checked={couponForm.active} onCheckedChange={v => setCouponForm(p => ({ ...p, active: v }))} />
                      <span className="text-sm">{couponForm.active ? "Active" : "Inactive"}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={saveCoupon}>
                        <Plus className="h-4 w-4 mr-1" /> {editingCoupon ? "Update" : "Create"} Coupon
                      </Button>
                      {editingCoupon && (
                        <Button variant="ghost" onClick={() => { setEditingCoupon(null); setCouponForm({ code: "", type: "percent", value: "", expiry_date: "", usage_limit: "", active: true }); }}>Cancel</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="text-lg">All Coupons</CardTitle></CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left p-4 font-medium text-muted-foreground">Code</th>
                            <th className="text-left p-4 font-medium text-muted-foreground">Type</th>
                            <th className="text-left p-4 font-medium text-muted-foreground">Value</th>
                            <th className="text-left p-4 font-medium text-muted-foreground">Expiry</th>
                            <th className="text-left p-4 font-medium text-muted-foreground">Used</th>
                            <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                            <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {coupons.map((c) => (
                            <tr key={c.id} className="border-b border-border hover:bg-muted/50">
                              <td className="p-4 font-mono font-bold">{c.code}</td>
                              <td className="p-4">{c.type === "percent" ? "%" : "₹"}</td>
                              <td className="p-4">{c.type === "percent" ? `${c.value}%` : `₹${c.value}`}</td>
                              <td className="p-4 text-muted-foreground">{c.expiry_date ? new Date(c.expiry_date).toLocaleDateString() : "—"}</td>
                              <td className="p-4">{c.times_used}{c.usage_limit ? `/${c.usage_limit}` : ""}</td>
                              <td className="p-4"><Badge variant={c.active ? "default" : "secondary"}>{c.active ? "Active" : "Inactive"}</Badge></td>
                              <td className="p-4 flex gap-1">
                                <Button size="sm" variant="ghost" onClick={() => {
                                  setEditingCoupon(c.id);
                                  setCouponForm({ code: c.code, type: c.type, value: String(c.value), expiry_date: c.expiry_date?.split("T")[0] || "", usage_limit: c.usage_limit ? String(c.usage_limit) : "", active: c.active });
                                }}>
                                  <Edit className="h-3.5 w-3.5" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-destructive" onClick={() => setDeleteDialog({ open: true, type: "coupon", id: c.id, label: c.code })}>
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                          {coupons.length === 0 && (
                            <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No coupons yet</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* ── SETTINGS ── */}
          {section === "settings" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Site Settings</h1>
              <div className="grid gap-6">
                <Card>
                  <CardHeader><CardTitle className="text-lg">General</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Website Name</label>
                      <Input value={siteSettings.site_name || ""} onChange={e => updateSetting("site_name", e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Logo URL</label>
                      <Input value={siteSettings.logo_url || ""} onChange={e => updateSetting("logo_url", e.target.value)} placeholder="https://..." />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Footer Text</label>
                      <Input value={siteSettings.footer_text || ""} onChange={e => updateSetting("footer_text", e.target.value)} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="text-lg">Feature Toggles</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { key: "features_courses", label: "Courses" },
                      { key: "features_mock_test", label: "Mock Tests" },
                      { key: "features_interview", label: "AI Interview" },
                    ].map(f => (
                      <div key={f.key} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{f.label}</span>
                        <Switch
                          checked={siteSettings[f.key] === "true"}
                          onCheckedChange={v => updateSetting(f.key, v ? "true" : "false")}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Button onClick={saveSettings} disabled={settingsLoading} className="gradient-bg">
                  {settingsLoading ? "Saving..." : "Save All Settings"}
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onOpenChange={(o) => setDeleteDialog(p => ({ ...p, open: o }))}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{deleteDialog.label}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteDialog({ open: false, type: "", id: "", label: "" })}>Cancel</Button>
            <Button variant="destructive" onClick={() => {
              if (deleteDialog.type === "coupon") deleteCoupon(deleteDialog.id);
            }}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AdminPanel;
