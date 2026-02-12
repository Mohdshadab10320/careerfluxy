import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Clock, ChevronRight, ThumbsUp, ThumbsDown, Minus, Lightbulb, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const mockQuestions = [
  { q: "Tell me about yourself and your background.", category: "HR" },
  { q: "What are your greatest strengths and weaknesses?", category: "HR" },
  { q: "Explain the difference between an array and a linked list.", category: "Technical" },
  { q: "Where do you see yourself in 5 years?", category: "HR" },
  { q: "How do you handle pressure and tight deadlines?", category: "Behavioral" },
];

const Simulator = () => {
  const [course, setCourse] = useState("it");
  const [difficulty, setDifficulty] = useState("intermediate");
  const [mood, setMood] = useState("friendly");
  const [currentQ, setCurrentQ] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score] = useState(7);

  const handleSubmit = () => {
    if (answer.trim()) setSubmitted(true);
  };

  const handleNext = () => {
    setSubmitted(false);
    setAnswer("");
    setCurrentQ((prev) => (prev + 1) % mockQuestions.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            AI Interview <span className="gradient-text">Simulator</span>
          </h1>
          <p className="text-muted-foreground mt-2">Practice and get instant AI feedback.</p>
        </motion.div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Select value={course} onValueChange={setCourse}>
            <SelectTrigger><SelectValue placeholder="Select Course" /></SelectTrigger>
            <SelectContent>
              {["IT", "Accounting", "Banking", "SSC/Govt", "Management", "Medical", "Teaching", "Polytechnic"].map((c) => (
                <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Select value={mood} onValueChange={setMood}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="friendly">Friendly</SelectItem>
              <SelectItem value="strict">Strict</SelectItem>
              <SelectItem value="corporate">Corporate</SelectItem>
              <SelectItem value="rapid">Rapid Fire</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Question area */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {mockQuestions[currentQ].category}
                </span>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Q {currentQ + 1}/{mockQuestions.length}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="gradient-bg rounded-lg p-2 flex-shrink-0">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
                <h2 className="text-lg font-semibold text-foreground leading-relaxed">
                  {mockQuestions[currentQ].q}
                </h2>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
              <Textarea
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={5}
                className="resize-none mb-4 bg-muted/50 border-border"
                disabled={submitted}
              />
              <div className="flex gap-3">
                {!submitted ? (
                  <Button onClick={handleSubmit} disabled={!answer.trim()} className="gradient-bg border-0 text-primary-foreground hover:opacity-90">
                    <Send className="h-4 w-4 mr-2" /> Submit Answer
                  </Button>
                ) : (
                  <Button onClick={handleNext} className="gradient-bg border-0 text-primary-foreground hover:opacity-90">
                    Next Question <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Feedback panel */}
          <div className="lg:col-span-2 space-y-4">
            {submitted ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div className="bg-card rounded-2xl border border-border p-6 shadow-card text-center">
                  <p className="text-sm text-muted-foreground mb-1">Your Score</p>
                  <p className="font-display text-5xl font-bold gradient-text">{score}/10</p>
                  <Progress value={score * 10} className="mt-4 h-2" />
                </div>

                {[
                  { label: "Weak Answer", icon: ThumbsDown, color: "text-destructive", text: "I don't know much about this topic." },
                  { label: "Average Answer", icon: Minus, color: "text-muted-foreground", text: "I have some experience in this area and have worked on a few projects." },
                  { label: "Ideal Answer", icon: ThumbsUp, color: "text-primary", text: "I'm a detail-oriented professional with 2+ years of experience in full-stack development, passionate about solving complex problems..." },
                ].map((ex) => (
                  <div key={ex.label} className="bg-card rounded-xl border border-border p-4 shadow-card">
                    <div className="flex items-center gap-2 mb-2">
                      <ex.icon className={`h-4 w-4 ${ex.color}`} />
                      <span className="text-xs font-semibold text-foreground">{ex.label}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{ex.text}</p>
                  </div>
                ))}

                <div className="bg-card rounded-xl border border-border p-4 shadow-card">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-accent" />
                    <span className="text-xs font-semibold text-foreground">AI Suggestion</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Structure your answer using the STAR method — Situation, Task, Action, Result. Be specific with examples.
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="bg-card rounded-2xl border border-border p-8 shadow-card text-center">
                <Bot className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">Submit your answer to get AI evaluation and feedback.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Simulator;
