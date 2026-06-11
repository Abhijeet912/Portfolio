import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

/** Soft radial glow that trails the cursor (fine pointers only). */
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const mx = useMotionValue(-600);
  const my = useMotionValue(-600);
  const x = useSpring(mx, { stiffness: 90, damping: 22, mass: 0.6 });
  const y = useSpring(my, { stiffness: 90, damping: 22, mass: 0.6 });
  const background = useMotionTemplate`radial-gradient(560px circle at ${x}px ${y}px, rgba(34, 211, 238, 0.055), rgba(139, 92, 246, 0.04) 45%, transparent 70%)`;

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [mx, my]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background }}
    />
  );
}
