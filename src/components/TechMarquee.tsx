interface TechMarqueeProps {
  items: string[];
}

/** Infinite scrolling strip of technologies — pauses on hover. */
export default function TechMarquee({ items }: TechMarqueeProps) {
  const row = [...items, ...items];
  return (
    <div
      className="group relative overflow-hidden border-y border-white/5 bg-night-900/40 py-5"
      aria-label="Technologies I work with"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-night-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-night-950 to-transparent" />
      <div className="flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-3 font-mono text-sm tracking-wide whitespace-nowrap text-haze-500 transition-colors hover:text-neon-cyan"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-neon-cyan to-neon-violet" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
