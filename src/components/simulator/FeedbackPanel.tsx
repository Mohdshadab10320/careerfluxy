import { ThumbsUp, ThumbsDown, Minus, Lightbulb, BarChart3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import type { AIEvaluation } from "@/hooks/useInterviewTools";

interface FeedbackPanelProps {
  evaluation: AIEvaluation | null;
  loading: boolean;
}

const FeedbackPanel = ({ evaluation, loading }: FeedbackPanelProps) => {
  if (loading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
        <div className="bg-card rounded-2xl border border-border p-8 shadow-card text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">AI is evaluating your answer...</p>
        </div>
      </motion.div>
    );
  }

  if (!evaluation) return null;

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
      {/* Score */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card text-center">
        <p className="text-sm text-muted-foreground mb-1">Your Score</p>
        <p className="font-display text-5xl font-bold gradient-text">{evaluation.score}/10</p>
        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
          evaluation.rating === "ideal" ? "bg-primary/10 text-primary" :
          evaluation.rating === "average" ? "bg-muted text-muted-foreground" :
          "bg-destructive/10 text-destructive"
        }`}>
          {evaluation.rating.toUpperCase()}
        </span>
        <Progress value={evaluation.score * 10} className="mt-4 h-2" />
      </div>

      {/* Feedback */}
      <div className="bg-card rounded-xl border border-border p-4 shadow-card">
        <p className="text-sm font-semibold text-foreground mb-2">📝 Feedback</p>
        <p className="text-sm text-muted-foreground">{evaluation.feedback}</p>
      </div>

      {/* Answer Examples */}
      {[
        { label: "Weak Answer", icon: ThumbsDown, color: "text-destructive", text: evaluation.weak_answer },
        { label: "Average Answer", icon: Minus, color: "text-muted-foreground", text: evaluation.average_answer },
        { label: "Ideal Answer", icon: ThumbsUp, color: "text-primary", text: evaluation.ideal_answer },
      ].map((ex) => (
        <div key={ex.label} className="bg-card rounded-xl border border-border p-4 shadow-card">
          <div className="flex items-center gap-2 mb-2">
            <ex.icon className={`h-4 w-4 ${ex.color}`} />
            <span className="text-xs font-semibold text-foreground">{ex.label}</span>
          </div>
          <p className="text-sm text-muted-foreground">{ex.text}</p>
        </div>
      ))}

      {/* Mistakes */}
      {evaluation.mistakes.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-4 shadow-card">
          <p className="text-xs font-semibold text-foreground mb-2">⚠️ Mistakes</p>
          <ul className="space-y-1">
            {evaluation.mistakes.map((m, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-destructive mt-0.5">•</span> {m}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* AI Suggestion */}
      <div className="bg-card rounded-xl border border-border p-4 shadow-card">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="h-4 w-4 text-accent" />
          <span className="text-xs font-semibold text-foreground">AI Suggestion</span>
        </div>
        <p className="text-sm text-muted-foreground">{evaluation.suggestion}</p>
      </div>

      {/* Skills */}
      <div className="bg-card rounded-xl border border-border p-4 shadow-card">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold text-foreground">Skill Breakdown</span>
        </div>
        <div className="space-y-3">
          {Object.entries(evaluation.skills).map(([key, val]) => (
            <div key={key}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-foreground font-medium capitalize">{key}</span>
                <span className="text-muted-foreground">{val}%</span>
              </div>
              <Progress value={val} className="h-1.5" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FeedbackPanel;
