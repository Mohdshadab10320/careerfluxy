import InfiniteSlider from "./InfiniteSlider";
import { Trophy, Flame, Mic, Award, Star, Zap } from "lucide-react";

const items = [
  { icon: Trophy, text: "Rahul completed English Level 3", color: "text-yellow-400" },
  { icon: Flame, text: "Aman hit a 14-day streak", color: "text-orange-400" },
  { icon: Mic, text: "Priya improved fluency to 92%", color: "text-cyan-400" },
  { icon: Award, text: "Sneha earned the Interview Pro badge", color: "text-purple-400" },
  { icon: Star, text: "Karan scored 9.2 in TCS mock", color: "text-pink-400" },
  { icon: Zap, text: "Megha unlocked Fluent Speaker level", color: "text-blue-400" },
  { icon: Trophy, text: "Vikram cracked Infosys mock 10/10", color: "text-yellow-400" },
  { icon: Flame, text: "Anjali earned 1,200 XP today", color: "text-orange-400" },
];

const AchieversStrip = () => (
  <section className="py-10 bg-muted/30">
    <InfiniteSlider
      speed="normal"
      items={items.map(({ icon: Icon, text, color }) => (
        <div className="flex items-center gap-3 rounded-full bg-card border border-border px-5 py-2.5 shadow-card">
          <Icon className={`h-4 w-4 ${color}`} />
          <span className="text-sm font-medium text-foreground whitespace-nowrap">{text}</span>
        </div>
      ))}
    />
  </section>
);
export default AchieversStrip;