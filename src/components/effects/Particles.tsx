import { useMemo } from "react";

type Props = { count?: number; className?: string };

const Particles = ({ count = 30, className = "" }: Props) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        size: Math.random() * 4 + 1,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 10,
        hue: ["var(--neon-blue)", "var(--neon-purple)", "var(--neon-cyan)", "var(--neon-pink)"][i % 4],
      })),
    [count]
  );
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: `hsl(${p.hue})`,
            boxShadow: `0 0 ${p.size * 4}px hsl(${p.hue} / 0.8)`,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite, ping-slow ${p.duration * 1.5}s ease-out ${p.delay}s infinite`,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
};
export default Particles;