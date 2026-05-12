import { useEffect, useState } from "react";

const CursorGlow = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!enabled) return null;
  return (
    <div
      className="pointer-events-none fixed z-[9999] h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 mix-blend-screen blur-3xl transition-transform duration-100"
      style={{
        left: pos.x,
        top: pos.y,
        background: "radial-gradient(circle, hsl(var(--neon-blue) / 0.6), hsl(var(--neon-purple) / 0.3) 40%, transparent 70%)",
      }}
    />
  );
};
export default CursorGlow;