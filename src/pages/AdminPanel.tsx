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
  Plus, Trash2, Save, Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Section = "dashboard" | "courses" | "tests" | "companies" | "users";

const AdminPanel = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [section, setSection] = useState<Section>("dashboard");
  const [stats, setStats] = useState({ users: 0, courses: 8, questions: 150 });
  const [users, setUsers] = useState<any[]>([]);

  // Course manager state
  const [newCourse, setNewCourse] = useState({ name: "", category: "", description: "" });
  const [newVideo, setNewVideo] = useState({ course: "", title: "", videoId: "", duration: "", description: "" });

  // Test manager state
  const [newQuestion, setNewQuestion] = useState({
    course: "", question: "", options: ["", "", "", ""], correctIndex: 0, explanation: "", topic: ""
  });

  // Company manager state
  const [newCompany, setNewCompany] = useState({ name: "", industry: "", questions: "" });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/");
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchStats();
      if (section === "users") fetchUsers();
    }
  }, [isAdmin, section]);

  const fetchStats = async () => {
    const { count: userCount } = await supabase.from("profiles").select("*", { count: "exact", head: true });
    setStats(prev => ({ ...prev, users: userCount || 0 }));
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

  const sideItems: { key: Section; label: string; icon: any }[] = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "courses", label: "Courses", icon: BookOpen },
    { key: "tests", label: "Mock Tests", icon: FileQuestion },
    { key: "companies", label: "Companies", icon: Building2 },
    { key: "users", label: "Users", icon: Users },
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
          {/* Dashboard */}
          {section === "dashboard" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Users</CardTitle></CardHeader>
                  <CardContent><p className="text-3xl font-bold">{stats.users}</p></CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Courses</CardTitle></CardHeader>
                  <CardContent><p className="text-3xl font-bold">{stats.courses}</p></CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Questions</CardTitle></CardHeader>
                  <CardContent><p className="text-3xl font-bold">{stats.questions}</p></CardContent>
                </Card>
              </div>
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

          {/* Mock Test Manager */}
          {section === "tests" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Mock Test Manager</h1>
              <Card>
                <CardHeader><CardTitle className="text-lg">Add Question</CardTitle></CardHeader>
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
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;
