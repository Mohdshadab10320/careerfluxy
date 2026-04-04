import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Clock, ChevronRight, ArrowLeft, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import courseVideos, { VideoModule } from "@/data/courseVideos";

const levelColors: Record<string, string> = {
  beginner: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  intermediate: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  advanced: "bg-red-500/10 text-red-500 border-red-500/20",
};

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courseId ? courseVideos[courseId] : null;
  const [selectedSub, setSelectedSub] = useState(0);
  const [activeModule, setActiveModule] = useState<VideoModule | null>(null);

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-16 text-center">
          <p className="text-muted-foreground">Course not found.</p>
          <Button asChild className="mt-4"><Link to="/courses">← Back to Courses</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  const sub = course.subCourses[selectedSub];
  const currentModule = activeModule || sub.modules[0];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/courses"><ArrowLeft className="h-4 w-4 mr-1" /> All Courses</Link>
          </Button>
          <Badge variant="outline" className="text-sm">{course.icon} {course.label}</Badge>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Sub Courses */}
          <div className="lg:col-span-1 space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Sub Courses</h3>
            {course.subCourses.map((sc, i) => (
              <button
                key={sc.name}
                onClick={() => { setSelectedSub(i); setActiveModule(null); }}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                  selectedSub === i
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "bg-card border border-border text-foreground hover:bg-muted"
                }`}
              >
                <span className="mr-2">{sc.icon}</span>
                {sc.name}
                <span className="text-xs text-muted-foreground ml-2">({sc.modules.length})</span>
              </button>
            ))}

            <div className="pt-4">
              <Button asChild size="sm" className="w-full gradient-bg border-0 text-primary-foreground hover:opacity-90">
                <Link to={`/mock-tests?course=${courseId}`}>
                  <GraduationCap className="h-4 w-4 mr-2" /> Take Mock Test
                </Link>
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Video Player */}
            <motion.div
              key={currentModule.videoId + currentModule.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border border-border overflow-hidden shadow-card"
            >
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${currentModule.videoId}`}
                  title={currentModule.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className={levelColors[currentModule.level]}>
                    {currentModule.level}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {currentModule.duration}
                  </span>
                </div>
                <h2 className="font-display text-xl font-bold text-foreground">{currentModule.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">{currentModule.description}</p>
              </div>
            </motion.div>

            {/* Module List */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">
                {sub.icon} {sub.name} — All Modules
              </h3>
              <div className="space-y-2">
                {(["beginner", "intermediate", "advanced"] as const).map((level) => {
                  const modules = sub.modules.filter(m => m.level === level);
                  if (modules.length === 0) return null;
                  return (
                    <div key={level}>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 mt-4">
                        {level}
                      </p>
                      {modules.map((mod, mi) => (
                        <button
                          key={mi}
                          onClick={() => setActiveModule(mod)}
                          className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all mb-2 ${
                            currentModule.title === mod.title
                              ? "bg-primary/10 border border-primary/20"
                              : "bg-card border border-border hover:bg-muted/50"
                          }`}
                        >
                          <div className={`rounded-lg p-2 ${currentModule.title === mod.title ? "gradient-bg" : "bg-muted"}`}>
                            <Play className={`h-4 w-4 ${currentModule.title === mod.title ? "text-primary-foreground" : "text-muted-foreground"}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-foreground truncate">{mod.title}</p>
                            <p className="text-xs text-muted-foreground truncate">{mod.description}</p>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground flex-shrink-0">
                            <Clock className="h-3 w-3" /> {mod.duration}
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseDetail;
