import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Code, FolderOpen, Link2, Plus, Trash2, Download, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  github: string;
  linkedin: string;
  portfolio: string;
}

interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface Project {
  name: string;
  description: string;
  tech: string;
  link: string;
}

const ResumeBuilder = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [preview, setPreview] = useState(false);

  const [personal, setPersonal] = useState<PersonalInfo>({
    fullName: "", email: "", phone: "", location: "", summary: "", github: "", linkedin: "", portfolio: "",
  });
  const [skills, setSkills] = useState<string[]>([""]);
  const [experiences, setExperiences] = useState<Experience[]>([{ title: "", company: "", duration: "", description: "" }]);
  const [educations, setEducations] = useState<Education[]>([{ degree: "", institution: "", year: "" }]);
  const [projects, setProjects] = useState<Project[]>([{ name: "", description: "", tech: "", link: "" }]);

  const steps = ["Personal", "Skills", "Experience", "Education", "Projects", "Preview"];

  const addItem = (setter: any, template: any) => setter((prev: any[]) => [...prev, template]);
  const removeItem = (setter: any, index: number) => setter((prev: any[]) => prev.filter((_: any, i: number) => i !== index));
  const updateItem = (setter: any, index: number, field: string, value: string) =>
    setter((prev: any[]) => prev.map((item: any, i: number) => (i === index ? { ...item, [field]: value } : item)));

  const downloadPDF = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) { toast({ variant: "destructive", title: "Popup blocked" }); return; }

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${personal.fullName} - Resume</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',Arial,sans-serif;color:#1a1a1a;line-height:1.5;padding:40px 50px;max-width:800px;margin:0 auto}
h1{font-size:28px;color:#1e3a5f;margin-bottom:4px}
h2{font-size:14px;color:#1e3a5f;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #1e3a5f;padding-bottom:4px;margin:18px 0 10px}
h3{font-size:15px;margin-bottom:2px}
.contact{color:#555;font-size:13px;margin-bottom:6px}
.contact a{color:#1e3a5f;text-decoration:none}
.summary{font-size:13px;color:#444;margin-bottom:8px}
.skills{display:flex;flex-wrap:wrap;gap:6px}
.skill{background:#e8edf3;color:#1e3a5f;padding:3px 10px;border-radius:12px;font-size:12px}
.entry{margin-bottom:12px}
.entry-header{display:flex;justify-content:space-between;align-items:baseline}
.entry-title{font-weight:600;font-size:14px}
.entry-sub{color:#555;font-size:13px}
.entry-date{color:#888;font-size:12px}
.entry-desc{font-size:13px;color:#444;margin-top:3px}
.project-tech{font-size:11px;color:#1e3a5f;margin-top:2px}
@media print{body{padding:20px 30px}@page{margin:0.5in}}
</style></head><body>
<h1>${personal.fullName}</h1>
<div class="contact">
${[personal.email, personal.phone, personal.location].filter(Boolean).join(" • ")}
${personal.github ? ` • <a href="${personal.github}">GitHub</a>` : ""}
${personal.linkedin ? ` • <a href="${personal.linkedin}">LinkedIn</a>` : ""}
${personal.portfolio ? ` • <a href="${personal.portfolio}">Portfolio</a>` : ""}
</div>
${personal.summary ? `<h2>Summary</h2><p class="summary">${personal.summary}</p>` : ""}
${skills.filter(Boolean).length ? `<h2>Skills</h2><div class="skills">${skills.filter(Boolean).map(s => `<span class="skill">${s}</span>`).join("")}</div>` : ""}
${experiences.filter(e => e.title).length ? `<h2>Experience</h2>${experiences.filter(e => e.title).map(e => `
<div class="entry"><div class="entry-header"><div><span class="entry-title">${e.title}</span><span class="entry-sub"> — ${e.company}</span></div><span class="entry-date">${e.duration}</span></div>
<p class="entry-desc">${e.description}</p></div>`).join("")}` : ""}
${educations.filter(e => e.degree).length ? `<h2>Education</h2>${educations.filter(e => e.degree).map(e => `
<div class="entry"><div class="entry-header"><span class="entry-title">${e.degree}</span><span class="entry-date">${e.year}</span></div><p class="entry-sub">${e.institution}</p></div>`).join("")}` : ""}
${projects.filter(p => p.name).length ? `<h2>Projects</h2>${projects.filter(p => p.name).map(p => `
<div class="entry"><span class="entry-title">${p.name}</span>${p.link ? ` — <a href="${p.link}" style="color:#1e3a5f;font-size:12px">Link</a>` : ""}
<p class="entry-desc">${p.description}</p><p class="project-tech">Tech: ${p.tech}</p></div>`).join("")}` : ""}
</body></html>`;

    printWindow.document.write(html);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 500);
  };

  const ResumePreview = () => (
    <div className="bg-white text-gray-900 rounded-xl p-8 max-w-3xl mx-auto shadow-lg">
      <h1 className="text-3xl font-bold text-[#1e3a5f]">{personal.fullName || "Your Name"}</h1>
      <p className="text-sm text-gray-500 mt-1">
        {[personal.email, personal.phone, personal.location].filter(Boolean).join(" • ")}
      </p>
      {personal.summary && <><h2 className="text-xs uppercase tracking-widest text-[#1e3a5f] border-b-2 border-[#1e3a5f] pb-1 mt-5 mb-2 font-bold">Summary</h2><p className="text-sm text-gray-600">{personal.summary}</p></>}
      {skills.filter(Boolean).length > 0 && (
        <><h2 className="text-xs uppercase tracking-widest text-[#1e3a5f] border-b-2 border-[#1e3a5f] pb-1 mt-5 mb-2 font-bold">Skills</h2>
        <div className="flex flex-wrap gap-1.5">{skills.filter(Boolean).map((s, i) => <span key={i} className="bg-blue-50 text-[#1e3a5f] px-2.5 py-0.5 rounded-full text-xs">{s}</span>)}</div></>
      )}
      {experiences.filter(e => e.title).length > 0 && (
        <><h2 className="text-xs uppercase tracking-widest text-[#1e3a5f] border-b-2 border-[#1e3a5f] pb-1 mt-5 mb-2 font-bold">Experience</h2>
        {experiences.filter(e => e.title).map((e, i) => <div key={i} className="mb-3"><div className="flex justify-between"><span className="font-semibold text-sm">{e.title} — {e.company}</span><span className="text-xs text-gray-400">{e.duration}</span></div><p className="text-xs text-gray-600 mt-1">{e.description}</p></div>)}</>
      )}
      {educations.filter(e => e.degree).length > 0 && (
        <><h2 className="text-xs uppercase tracking-widest text-[#1e3a5f] border-b-2 border-[#1e3a5f] pb-1 mt-5 mb-2 font-bold">Education</h2>
        {educations.filter(e => e.degree).map((e, i) => <div key={i} className="mb-2"><div className="flex justify-between"><span className="font-semibold text-sm">{e.degree}</span><span className="text-xs text-gray-400">{e.year}</span></div><p className="text-xs text-gray-500">{e.institution}</p></div>)}</>
      )}
      {projects.filter(p => p.name).length > 0 && (
        <><h2 className="text-xs uppercase tracking-widest text-[#1e3a5f] border-b-2 border-[#1e3a5f] pb-1 mt-5 mb-2 font-bold">Projects</h2>
        {projects.filter(p => p.name).map((p, i) => <div key={i} className="mb-3"><span className="font-semibold text-sm">{p.name}</span><p className="text-xs text-gray-600 mt-1">{p.description}</p><p className="text-xs text-[#1e3a5f]">Tech: {p.tech}</p></div>)}</>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl font-bold text-foreground">
              AI <span className="gradient-text">Resume Builder</span>
            </h1>
            <p className="text-muted-foreground mt-2">Create a professional resume in minutes</p>
          </div>

          {/* Steps */}
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {steps.map((s, i) => (
              <button key={s} onClick={() => setStep(i)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${step === i ? "gradient-bg text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
                {s}
              </button>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Step 0: Personal */}
            {step === 0 && (
              <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Personal Information</h2>
                <Input placeholder="Full Name" value={personal.fullName} onChange={e => setPersonal({ ...personal, fullName: e.target.value })} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Email" value={personal.email} onChange={e => setPersonal({ ...personal, email: e.target.value })} />
                  <Input placeholder="Phone" value={personal.phone} onChange={e => setPersonal({ ...personal, phone: e.target.value })} />
                </div>
                <Input placeholder="Location" value={personal.location} onChange={e => setPersonal({ ...personal, location: e.target.value })} />
                <Textarea placeholder="Professional Summary" value={personal.summary} onChange={e => setPersonal({ ...personal, summary: e.target.value })} rows={3} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input placeholder="GitHub URL" value={personal.github} onChange={e => setPersonal({ ...personal, github: e.target.value })} />
                  <Input placeholder="LinkedIn URL" value={personal.linkedin} onChange={e => setPersonal({ ...personal, linkedin: e.target.value })} />
                  <Input placeholder="Portfolio URL" value={personal.portfolio} onChange={e => setPersonal({ ...personal, portfolio: e.target.value })} />
                </div>
              </div>
            )}

            {/* Step 1: Skills */}
            {step === 1 && (
              <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2"><Code className="h-5 w-5 text-primary" /> Skills</h2>
                {skills.map((skill, i) => (
                  <div key={i} className="flex gap-2">
                    <Input placeholder={`Skill ${i + 1}`} value={skill} onChange={e => { const n = [...skills]; n[i] = e.target.value; setSkills(n); }} />
                    {skills.length > 1 && <Button variant="ghost" size="icon" onClick={() => setSkills(skills.filter((_, j) => j !== i))}><Trash2 className="h-4 w-4 text-destructive" /></Button>}
                  </div>
                ))}
                <Button variant="outline" onClick={() => setSkills([...skills, ""])}><Plus className="h-4 w-4 mr-2" /> Add Skill</Button>
              </div>
            )}

            {/* Step 2: Experience */}
            {step === 2 && (
              <div className="bg-card rounded-xl border border-border p-6 space-y-6">
                <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2"><Briefcase className="h-5 w-5 text-primary" /> Experience</h2>
                {experiences.map((exp, i) => (
                  <div key={i} className="space-y-3 border-b border-border pb-4 last:border-0">
                    <div className="flex justify-between"><span className="text-sm font-medium text-foreground">Experience {i + 1}</span>
                      {experiences.length > 1 && <Button variant="ghost" size="sm" onClick={() => removeItem(setExperiences, i)}><Trash2 className="h-3 w-3 text-destructive" /></Button>}
                    </div>
                    <Input placeholder="Job Title" value={exp.title} onChange={e => updateItem(setExperiences, i, "title", e.target.value)} />
                    <div className="grid grid-cols-2 gap-3">
                      <Input placeholder="Company" value={exp.company} onChange={e => updateItem(setExperiences, i, "company", e.target.value)} />
                      <Input placeholder="Duration (e.g., 2022-2024)" value={exp.duration} onChange={e => updateItem(setExperiences, i, "duration", e.target.value)} />
                    </div>
                    <Textarea placeholder="Description" value={exp.description} onChange={e => updateItem(setExperiences, i, "description", e.target.value)} rows={2} />
                  </div>
                ))}
                <Button variant="outline" onClick={() => addItem(setExperiences, { title: "", company: "", duration: "", description: "" })}><Plus className="h-4 w-4 mr-2" /> Add Experience</Button>
              </div>
            )}

            {/* Step 3: Education */}
            {step === 3 && (
              <div className="bg-card rounded-xl border border-border p-6 space-y-6">
                <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2"><GraduationCap className="h-5 w-5 text-primary" /> Education</h2>
                {educations.map((edu, i) => (
                  <div key={i} className="space-y-3 border-b border-border pb-4 last:border-0">
                    <div className="flex justify-between"><span className="text-sm font-medium text-foreground">Education {i + 1}</span>
                      {educations.length > 1 && <Button variant="ghost" size="sm" onClick={() => removeItem(setEducations, i)}><Trash2 className="h-3 w-3 text-destructive" /></Button>}
                    </div>
                    <Input placeholder="Degree" value={edu.degree} onChange={e => updateItem(setEducations, i, "degree", e.target.value)} />
                    <div className="grid grid-cols-2 gap-3">
                      <Input placeholder="Institution" value={edu.institution} onChange={e => updateItem(setEducations, i, "institution", e.target.value)} />
                      <Input placeholder="Year" value={edu.year} onChange={e => updateItem(setEducations, i, "year", e.target.value)} />
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={() => addItem(setEducations, { degree: "", institution: "", year: "" })}><Plus className="h-4 w-4 mr-2" /> Add Education</Button>
              </div>
            )}

            {/* Step 4: Projects */}
            {step === 4 && (
              <div className="bg-card rounded-xl border border-border p-6 space-y-6">
                <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2"><FolderOpen className="h-5 w-5 text-primary" /> Projects</h2>
                {projects.map((p, i) => (
                  <div key={i} className="space-y-3 border-b border-border pb-4 last:border-0">
                    <div className="flex justify-between"><span className="text-sm font-medium text-foreground">Project {i + 1}</span>
                      {projects.length > 1 && <Button variant="ghost" size="sm" onClick={() => removeItem(setProjects, i)}><Trash2 className="h-3 w-3 text-destructive" /></Button>}
                    </div>
                    <Input placeholder="Project Name" value={p.name} onChange={e => updateItem(setProjects, i, "name", e.target.value)} />
                    <Textarea placeholder="Description" value={p.description} onChange={e => updateItem(setProjects, i, "description", e.target.value)} rows={2} />
                    <div className="grid grid-cols-2 gap-3">
                      <Input placeholder="Tech Stack" value={p.tech} onChange={e => updateItem(setProjects, i, "tech", e.target.value)} />
                      <Input placeholder="Project Link" value={p.link} onChange={e => updateItem(setProjects, i, "link", e.target.value)} />
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={() => addItem(setProjects, { name: "", description: "", tech: "", link: "" })}><Plus className="h-4 w-4 mr-2" /> Add Project</Button>
              </div>
            )}

            {/* Step 5: Preview */}
            {step === 5 && (
              <div className="space-y-4">
                <div className="flex justify-center gap-3">
                  <Button onClick={downloadPDF} className="gradient-bg border-0 text-primary-foreground">
                    <Download className="h-4 w-4 mr-2" /> Download PDF
                  </Button>
                </div>
                <ResumePreview />
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>Previous</Button>
              <Button disabled={step === steps.length - 1} onClick={() => setStep(step + 1)} className="gradient-bg border-0 text-primary-foreground">Next</Button>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ResumeBuilder;
