import { ReactNode } from "react";

type Props = {
  items: ReactNode[];
  speed?: "slow" | "normal" | "fast";
  reverse?: boolean;
  className?: string;
};

const speedMap = { slow: "60s", normal: "40s", fast: "25s" };

const InfiniteSlider = ({ items, speed = "normal", reverse = false, className = "" }: Props) => {
  const doubled = [...items, ...items];
  return (
    <div className={`relative overflow-hidden ${className}`}
      style={{ maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}>
      <div
        className={reverse ? "flex w-max marquee-track-reverse" : "flex w-max marquee-track"}
        style={{ animationDuration: speedMap[speed] }}
      >
        {doubled.map((it, i) => (
          <div key={i} className="px-4 shrink-0">{it}</div>
        ))}
      </div>
    </div>
  );
};
export default InfiniteSlider;