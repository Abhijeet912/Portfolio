import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export default function StatCounter({ value, suffix = "+", label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const t0 = performance.now();
    const duration = 1500;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setCount(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div ref={ref} className="glass rounded-2xl px-6 py-7 text-center transition-colors hover:border-neon-cyan/30">
      <div className="font-display text-4xl font-bold gradient-text sm:text-5xl">
        {count}
        {suffix}
      </div>
      <div className="mt-2 font-mono text-xs tracking-[0.2em] text-haze-500 uppercase">{label}</div>
    </div>
  );
}
