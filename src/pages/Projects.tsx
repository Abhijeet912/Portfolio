import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../services/content";
import type { ProjectStatus } from "../types/content";

type Filter = "all" | ProjectStatus;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
  { value: "deployed", label: "Deployed" },
];

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.status === filter);

  return (
    <>
      <Seo
        title="Projects — Abhijeet Anand"
        description="Full-stack apps, Kubernetes platforms, Android suites and enterprise cloud projects built by Abhijeet Anand."
        path="/projects"
      />

      <section className="relative mx-auto max-w-6xl overflow-hidden px-5 py-20 sm:px-8">
        <div
          aria-hidden="true"
          className="absolute -top-16 right-10 h-72 w-72 rounded-full bg-neon-cyan/10 blur-[110px]"
        />
        <SectionHeading
          eyebrow="Projects"
          title="Built to ship"
          description="From e-commerce platforms to Kubernetes tooling and enterprise cloud operations — here's what I've been working on."
        />

        {/* Filter chips */}
        <div className="mt-10 flex flex-wrap gap-2.5" role="tablist" aria-label="Filter projects by status">
          {FILTERS.map(({ value, label }) => {
            const active = filter === value;
            const count =
              value === "all" ? projects.length : projects.filter((p) => p.status === value).length;
            return (
              <button
                key={value}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(value)}
                className={`relative rounded-xl px-4 py-2 font-mono text-sm transition-colors ${
                  active ? "text-night-950" : "glass text-haze-300 hover:text-haze-100"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-violet"
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                  />
                )}
                <span className="relative">
                  {label} <span className={active ? "opacity-70" : "text-haze-500"}>({count})</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: [0.21, 0.6, 0.35, 1] }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <p className="mt-16 text-center font-mono text-sm text-haze-500">
            No projects with this status yet.
          </p>
        )}
      </section>
    </>
  );
}
