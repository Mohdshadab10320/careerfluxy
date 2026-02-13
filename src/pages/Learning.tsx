import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronRight, CheckCircle2, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import learningContent from "@/data/learningContent";

const courseKeys = Object.keys(learningContent);

const Learning = () => {
  const [searchParams] = useSearchParams();
  const [selectedCourse, setSelectedCourse] = useState(searchParams.get("course") || "");
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const course = selectedCourse ? learningContent[selectedCourse] : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Start <span className="gradient-text">Learning</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Course-wise study material to build your knowledge before the interview.
          </p>
        </motion.div>

        {/* Course Selection Grid */}
        {!selectedCourse ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {courseKeys.map((key, i) => {
              const c = learningContent[key];
              return (
                <motion.button
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedCourse(key)}
                  className="bg-card border border-border rounded-2xl p-6 text-left hover:border-primary/50 hover:shadow-lg transition-all group"
                >
                  <span className="text-4xl mb-3 block">{c.icon}</span>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {c.label}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {c.lessons.length} {c.lessons.length === 1 ? "module" : "modules"}
                  </p>
                </motion.button>
              );
            })}
          </motion.div>
        ) : (
          <div>
            {/* Back + Course Header */}
            <div className="flex items-center gap-3 mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCourse("");
                  setExpandedLesson(null);
                  setExpandedTopic(null);
                }}
              >
                ← All Courses
              </Button>
              <Badge variant="outline" className="text-sm">
                {course?.icon} {course?.label}
              </Badge>
            </div>

            {/* Lessons */}
            <div className="space-y-4">
              {course?.lessons.map((lesson, li) => (
                <motion.div
                  key={li}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: li * 0.08 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden shadow-card"
                >
                  {/* Lesson Header */}
                  <button
                    onClick={() => setExpandedLesson(expandedLesson === li ? null : li)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`bg-gradient-to-br ${course.color} rounded-lg p-2`}>
                        <GraduationCap className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{lesson.title}</h3>
                        <p className="text-sm text-muted-foreground">{lesson.description}</p>
                      </div>
                    </div>
                    <ChevronRight
                      className={`h-5 w-5 text-muted-foreground transition-transform ${
                        expandedLesson === li ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {/* Topics */}
                  <AnimatePresence>
                    {expandedLesson === li && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-border"
                      >
                        <div className="p-5 space-y-3">
                          {lesson.topics.map((topic) => {
                            const topicKey = `${li}-${topic.name}`;
                            const isOpen = expandedTopic === topicKey;
                            return (
                              <div
                                key={topicKey}
                                className="bg-muted/40 rounded-xl border border-border overflow-hidden"
                              >
                                <button
                                  onClick={() => setExpandedTopic(isOpen ? null : topicKey)}
                                  className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/60 transition-colors"
                                >
                                  <div className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 text-primary" />
                                    <span className="font-medium text-sm text-foreground">
                                      {topic.name}
                                    </span>
                                  </div>
                                  <ChevronRight
                                    className={`h-4 w-4 text-muted-foreground transition-transform ${
                                      isOpen ? "rotate-90" : ""
                                    }`}
                                  />
                                </button>

                                <AnimatePresence>
                                  {isOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="px-4 pb-4">
                                        <p className="text-sm text-muted-foreground mb-3">
                                          {topic.summary}
                                        </p>
                                        <ul className="space-y-2">
                                          {topic.keyPoints.map((point, pi) => (
                                            <li
                                              key={pi}
                                              className="flex items-start gap-2 text-sm text-foreground"
                                            >
                                              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                              <span>{point}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}

                          {/* Practice CTA */}
                          <div className="pt-2">
                            <Button asChild size="sm" className="gradient-bg border-0 text-primary-foreground hover:opacity-90">
                              <Link to={`/simulator?course=${selectedCourse}`}>
                                Practice Mock Test <ArrowRight className="h-4 w-4 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Learning;
