import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot, Clock, ChevronRight, Send, BookOpen, Mic, MicOff, Video, VideoOff, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeedbackPanel from "@/components/simulator/FeedbackPanel";
import questionBank from "@/data/questionBank";
import { useAIEvaluation, useVoiceRecorder, useCamera } from "@/hooks/useInterviewTools";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const courseLabels: Record<string, string> = {
  it: "IT", accounting: "Accounting", banking: "Banking",
  "ssc/govt": "SSC/Govt", management: "Management",
  medical: "Medical", teaching: "Teaching", polytechnic: "Polytechnic",
};

type InterviewMode = "text" | "voice" | "camera";

const Simulator = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(searchParams.get("course") || "it");
  const [difficulty, setDifficulty] = useState("intermediate");
  const [mood, setMood] = useState("friendly");
  const [mode, setMode] = useState<InterviewMode>("text");
  const [currentQ, setCurrentQ] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const videoElRef = useRef<HTMLVideoElement>(null);

  const { evaluation, loading, evaluate, reset } = useAIEvaluation();
  const { recording, transcript, startRecording, stopRecording, resetTranscript, setTranscript } = useVoiceRecorder();
  const camera = useCamera();

  const questions = useMemo(() => {
    const bank = questionBank[course];
    if (!bank) return questionBank["it"]["intermediate"];
    return bank[difficulty] || bank["intermediate"] || [];
  }, [course, difficulty]);

  useEffect(() => {
    setCurrentQ(0); setSubmitted(false); setAnswer(""); reset();
  }, [course, difficulty, reset]);

  useEffect(() => {
    const urlCourse = searchParams.get("course");
    if (urlCourse && questionBank[urlCourse]) setCourse(urlCourse);
  }, [searchParams]);

  // Sync voice transcript to answer
  useEffect(() => {
    if (mode === "voice" || mode === "camera") setAnswer(transcript);
  }, [transcript, mode]);

  // Start/stop camera when mode changes
  useEffect(() => {
    if (mode === "camera" && videoElRef.current) {
      camera.startCamera(videoElRef.current);
    } else {
      camera.stopCamera();
    }
    return () => camera.stopCamera();
  }, [mode]);

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    if (recording) stopRecording();
    setSubmitted(true);
    const result = await evaluate(questions[currentQ]?.q || "", answer, course, mood);

    // Save session to database if logged in
    if (user && result) {
      await supabase.from("interview_sessions").insert({
        user_id: user.id,
        interview_type: questions[currentQ]?.category || "general",
        mode,
        mood,
        course,
        score: result.score,
        feedback: result as any,
        mistakes: result.mistakes as any,
      });
    }
  };

  const handleNext = () => {
    setSubmitted(false); setAnswer(""); reset(); resetTranscript();
    setCurrentQ((prev) => (prev + 1) % questions.length);
  };

  const toggleVoice = () => {
    if (recording) stopRecording();
    else startRecording();
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

        {/* Mode Selection */}
        <div className="flex flex-wrap gap-3 mb-6">
          {([
            { value: "text" as InterviewMode, icon: MessageSquare, label: "Text" },
            { value: "voice" as InterviewMode, icon: Mic, label: "Voice" },
            { value: "camera" as InterviewMode, icon: Video, label: "Camera" },
          ]).map((m) => (
            <Button
              key={m.value}
              variant={mode === m.value ? "default" : "outline"}
              className={mode === m.value ? "gradient-bg border-0 text-primary-foreground" : ""}
              onClick={() => setMode(m.value)}
            >
              <m.icon className="h-4 w-4 mr-2" /> {m.label} Mode
            </Button>
          ))}
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Select value={course} onValueChange={setCourse}>
            <SelectTrigger><SelectValue placeholder="Select Course" /></SelectTrigger>
            <SelectContent>
              {Object.entries(courseLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
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
            {/* Camera view */}
            {mode === "camera" && (
              <div className="bg-card rounded-2xl border border-border p-4 shadow-card">
                <div className="flex items-center gap-2 mb-3">
                  <Video className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Camera Preview</span>
                  {camera.active && <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />}
                </div>
                <video
                  ref={videoElRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full rounded-xl bg-muted aspect-video object-cover"
                />
              </div>
            )}

            <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {questions[currentQ]?.category}
                  </span>
                  {questions[currentQ]?.topic && (
                    <Badge variant="outline" className="text-xs">
                      <BookOpen className="h-3 w-3 mr-1" />
                      {questions[currentQ].topic}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Q {currentQ + 1}/{questions.length}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="gradient-bg rounded-lg p-2 flex-shrink-0">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
                <h2 className="text-lg font-semibold text-foreground leading-relaxed">
                  {questions[currentQ]?.q}
                </h2>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
              {/* Voice controls */}
              {(mode === "voice" || mode === "camera") && (
                <div className="flex items-center gap-3 mb-4">
                  <Button
                    variant={recording ? "destructive" : "outline"}
                    size="sm"
                    onClick={toggleVoice}
                    disabled={submitted}
                  >
                    {recording ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                    {recording ? "Stop Recording" : "Start Speaking"}
                  </Button>
                  {recording && (
                    <span className="flex items-center gap-2 text-sm text-destructive">
                      <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                      Listening...
                    </span>
                  )}
                </div>
              )}

              <Textarea
                placeholder={mode === "text" ? "Type your answer here..." : "Your speech will appear here... (you can also edit)"}
                value={answer}
                onChange={(e) => { setAnswer(e.target.value); if (mode !== "text") setTranscript(e.target.value); }}
                rows={5}
                className="resize-none mb-4 bg-muted/50 border-border"
                disabled={submitted}
              />
              <div className="flex gap-3">
                {!submitted ? (
                  <Button onClick={handleSubmit} disabled={!answer.trim() || loading} className="gradient-bg border-0 text-primary-foreground hover:opacity-90">
                    {loading ? (
                      <><span className="animate-spin mr-2">⏳</span> Evaluating...</>
                    ) : (
                      <><Send className="h-4 w-4 mr-2" /> Submit Answer</>
                    )}
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
            {submitted || loading ? (
              <FeedbackPanel evaluation={evaluation} loading={loading} />
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
