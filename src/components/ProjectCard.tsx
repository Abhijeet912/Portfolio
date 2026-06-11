import { useRef, type PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import type { Project } from "../types/content";
import { ExternalLinkIcon, GithubIcon } from "./icons";
import { formatDate } from "../utils/frontmatter";

const STATUS_META: Record<Project["status"], { label: string; classes: string; dot: string }> = {
  ongoing: {
    label: "Ongoing",
    classes: "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10",
    dot: "bg-neon-cyan animate-pulse",
  },
  completed: {
    label: "Completed",
    classes: "text-neon-emerald border-neon-emerald/30 bg-neon-emerald/10",
    dot: "bg-neon-emerald",
  },
  deployed: {
    label: "Deployed",
    classes: "text-neon-violet border-neon-violet/30 bg-neon-violet/10",
    dot: "bg-neon-violet",
  },
};

const COVER_GRADIENTS = [
  "from-cyan-500/25 via-night-900 to-violet-600/25",
  "from-violet-600/25 via-night-900 to-pink-500/20",
  "from-emerald-500/20 via-night-900 to-cyan-500/25",
];

interface ProjectCardProps {
  project: Project;
  index?: number;
}

/** Glassmorphism project card with 3D tilt + glare that follows the cursor. */
export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rx = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgba(255,255,255,0.09), transparent 65%)`;

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rx.set(py * -8);
    ry.set(px * 10);
    gx.set((px + 0.5) * 100);
    gy.set((py + 0.5) * 100);
  };

  const onPointerLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const status = STATUS_META[project.status] ?? STATUS_META.completed;
  const cover = COVER_GRADIENTS[index % COVER_GRADIENTS.length];

  return (
    <motion.article
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-night-900/70 transition-colors duration-300 hover:border-neon-cyan/30"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glare }}
      />

      {/* Cover */}
      <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${cover}`}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-grid opacity-70" />
            <span className="absolute -bottom-7 left-4 font-display text-[7rem] leading-none font-bold text-white/6 select-none">
              {project.title.slice(0, 2)}
            </span>
          </>
        )}
        <span
          className={`absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] tracking-wide ${status.classes}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold text-haze-100 transition-colors group-hover:text-neon-cyan">
            {project.title}
          </h3>
          <span className="mt-1 shrink-0 font-mono text-[11px] text-haze-500">
            {formatDate(project.date)}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-haze-500">{project.description}</p>

        <div className="mt-auto flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/8 bg-white/4 px-2.5 py-1 font-mono text-[11px] text-haze-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {(project.githubUrl || project.liveUrl) && (
          <div className="flex items-center gap-4 border-t border-white/5 pt-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-haze-300 transition-colors hover:text-neon-cyan"
              >
                <GithubIcon className="h-4 w-4" /> Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-haze-300 transition-colors hover:text-neon-cyan"
              >
                <ExternalLinkIcon className="h-4 w-4" /> Live
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
