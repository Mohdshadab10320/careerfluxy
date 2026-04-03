import { useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface AIEvaluation {
  score: number;
  rating: "weak" | "average" | "ideal";
  feedback: string;
  mistakes: string[];
  weak_answer: string;
  average_answer: string;
  ideal_answer: string;
  suggestion: string;
  skills: {
    communication: number;
    technical: number;
    confidence: number;
    structure: number;
  };
}

export function useAIEvaluation() {
  const [evaluation, setEvaluation] = useState<AIEvaluation | null>(null);
  const [loading, setLoading] = useState(false);

  const evaluate = useCallback(async (question: string, answer: string, course: string, mood: string) => {
    setLoading(true);
    setEvaluation(null);
    try {
      const { data, error } = await supabase.functions.invoke("evaluate-answer", {
        body: { question, answer, course, mood },
      });
      if (error) throw error;
      if (data?.error) {
        toast({ title: "AI Error", description: data.error, variant: "destructive" });
        return null;
      }
      setEvaluation(data);
      return data as AIEvaluation;
    } catch (err: any) {
      console.error("AI evaluation error:", err);
      toast({ title: "Evaluation Failed", description: err.message || "Could not evaluate answer", variant: "destructive" });
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => setEvaluation(null), []);

  return { evaluation, loading, evaluate, reset };
}

// Voice recording hook
export function useVoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  const startRecording = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({ title: "Not Supported", description: "Voice recognition is not supported in your browser. Please use Chrome.", variant: "destructive" });
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    let finalTranscript = "";
    recognition.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      setTranscript(finalTranscript + interim);
    };
    recognition.onerror = (e: any) => {
      console.error("Speech recognition error:", e.error);
      setRecording(false);
    };
    recognition.onend = () => setRecording(false);

    recognitionRef.current = recognition;
    recognition.start();
    setRecording(true);
    setTranscript("");
  }, []);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    setRecording(false);
  }, []);

  const resetTranscript = useCallback(() => setTranscript(""), []);

  return { recording, transcript, startRecording, stopRecording, resetTranscript, setTranscript };
}

// Camera hook
export function useCamera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [active, setActive] = useState(false);

  const startCamera = useCallback(async (videoEl: HTMLVideoElement) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      videoEl.srcObject = stream;
      videoRef.current = videoEl;
      setActive(true);
    } catch (err) {
      console.error("Camera error:", err);
      toast({ title: "Camera Error", description: "Could not access your camera. Please grant permission.", variant: "destructive" });
    }
  }, []);

  const stopCamera = useCallback(() => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach((t) => t.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    setActive(false);
  }, []);

  return { active, startCamera, stopCamera };
}
