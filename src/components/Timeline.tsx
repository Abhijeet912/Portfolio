import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import type { Experience } from "../types/content";
import { BriefcaseIcon } from "./icons";

/** Vertical timeline with a scroll-linked glowing progress line. */
export default function Timeline({ items }: { items: Experience[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.6"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <div ref={ref} className="relative mx-auto max-w-3xl">
      {/* Track + animated progress line */}
      <div className="absolute top-0 bottom-0 left-[19px] w-px bg-white/8 sm:left-[23px]" aria-hidden="true" />
      <motion.div
        aria-hidden="true"
        style={{ scaleY }}
        className="absolute top-0 bottom-0 left-[19px] w-px origin-top bg-gradient-to-b from-neon-cyan via-neon-violet to-neon-pink shadow-[0_0_12px_rgba(34,211,238,0.6)] sm:left-[23px]"
      />

      <div className="space-y-10">
        {items.map((item, i) => (
          <motion.div
            key={item.slug}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: i * 0.12, ease: [0.21, 0.6, 0.35, 1] }}
            className="relative pl-14 sm:pl-16"
          >
            {/* Node */}
            <span className="absolute top-1 left-0 flex h-10 w-10 items-center justify-center rounded-xl border border-neon-cyan/30 bg-night-900 shadow-[0_0_18px_rgba(34,211,238,0.25)] sm:h-12 sm:w-12">
              <BriefcaseIcon className="h-5 w-5 text-neon-cyan" />
            </span>

            <div className="glass rounded-2xl p-6 transition-colors hover:border-neon-cyan/25">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl font-semibold text-haze-100">{item.role}</h3>
                <span className="rounded-full border border-neon-violet/30 bg-neon-violet/10 px-3 py-1 font-mono text-[11px] text-neon-violet">
                  {item.duration}
                </span>
              </div>
              <p className="mt-1 font-mono text-sm text-neon-cyan">{item.company}</p>
              <p className="mt-3 text-sm leading-relaxed text-haze-500">{item.description}</p>
              {item.highlights.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {item.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-haze-300">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-neon-cyan to-neon-violet" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
