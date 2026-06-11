import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "../components/Seo";
import ParticleField from "../components/ParticleField";
import TypeWriter from "../components/TypeWriter";
import MagneticButton from "../components/MagneticButton";
import SocialLinks from "../components/SocialLinks";
import TechMarquee from "../components/TechMarquee";
import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import BlogCard from "../components/BlogCard";
import StatCounter from "../components/StatCounter";
import Reveal from "../components/Reveal";
import { allSkills, featuredProjects, posts, projects, site } from "../services/content";
import { ArrowRightIcon, DownloadIcon } from "../components/icons";

const FLOATING_CHIPS = [
  { label: "Java", className: "top-2 -left-4 sm:-left-10", delay: "0s" },
  { label: "Spring Boot", className: "top-1/4 -right-6 sm:-right-14", delay: "1.1s" },
  { label: "React", className: "bottom-1/4 -left-8 sm:-left-16", delay: "2.2s" },
  { label: "Azure", className: "bottom-2 right-0 sm:-right-6", delay: "3s" },
  { label: "Kubernetes", className: "-top-6 right-1/4", delay: "1.7s" },
];

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <ParticleField className="absolute inset-0 h-full w-full opacity-70" />
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-neon-violet/14 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-neon-cyan/12 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pt-20 pb-24 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:pt-28 lg:pb-32">
        {/* Intro */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/25 bg-neon-cyan/8 px-4 py-1.5 font-mono text-xs text-neon-cyan"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-neon-emerald" />
            {site.role}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-6 font-display text-5xl leading-[1.05] font-bold text-haze-100 sm:text-6xl lg:text-7xl"
          >
            Hi, I'm{" "}
            <span className="gradient-text text-glow">{site.name.split(" ")[0]}</span>
            <span className="text-neon-cyan">.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-5 flex items-center gap-3 font-mono text-lg text-haze-300 sm:text-xl"
          >
            <span className="text-neon-violet">&gt;</span>
            <TypeWriter words={site.typewriter} className="min-h-[1.5em]" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-haze-500 sm:text-lg"
          >
            {site.tagline} {site.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton>
              <Link
                to="/projects"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-violet px-6 py-3.5 font-semibold text-night-950 transition-shadow hover:shadow-[0_0_32px_rgba(34,211,238,0.5)]"
              >
                View My Work <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                to="/contact"
                className="glass flex items-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-haze-100 transition-colors hover:border-neon-cyan/40 hover:text-neon-cyan"
              >
                Get In Touch
              </Link>
            </MagneticButton>
            {site.resumeUrl && (
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-2 py-3 text-sm font-medium text-haze-300 transition-colors hover:text-neon-cyan"
              >
                <DownloadIcon className="h-4 w-4" /> Resume
              </a>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10"
          >
            <SocialLinks />
          </motion.div>
        </div>

        {/* Portrait orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto w-fit"
        >
          <div className="relative h-64 w-64 sm:h-80 sm:w-80">
            {/* Rotating gradient ring */}
            <div
              aria-hidden="true"
              className="absolute -inset-3 animate-spin-slower rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0%, rgba(34,211,238,0.85) 12%, transparent 26%, transparent 50%, rgba(139,92,246,0.85) 64%, transparent 78%)",
                mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 2px))",
                WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 2px))",
              }}
            />
            <div className="absolute -inset-8 rounded-full bg-neon-violet/12 blur-3xl" aria-hidden="true" />

            <div className="glass relative flex h-full w-full items-center justify-center overflow-hidden rounded-full">
              {site.profileImage ? (
                <img src={site.profileImage} alt={site.name} className="h-full w-full object-cover" />
              ) : (
                <span className="font-display text-7xl font-bold gradient-text sm:text-8xl">
                  {site.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              )}
            </div>

            {/* Floating tech chips */}
            {FLOATING_CHIPS.map((chip) => (
              <span
                key={chip.label}
                className={`glass absolute hidden animate-float rounded-lg px-3 py-1.5 font-mono text-xs text-haze-100 sm:block ${chip.className}`}
                style={{ animationDelay: chip.delay }}
              >
                {chip.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const latestPosts = posts.slice(0, 2);

  return (
    <>
      <Seo
        title="Abhijeet Anand — Software Engineer"
        description="Software Engineer at TCS building scalable backend, cloud and AI-powered applications with Java, Spring Boot, React, Azure and Kubernetes."
        path="/"
      />

      <Hero />

      <TechMarquee items={allSkills.length > 0 ? allSkills : ["Java", "Spring Boot", "React", "Azure", "Kubernetes"]} />

      {/* Featured projects */}
      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured Work"
            title="Things I've built"
            description="A selection of projects spanning full-stack apps, cloud platforms and mobile — built to ship, not just to demo."
          />
          <Reveal delay={0.15}>
            <Link
              to="/projects"
              className="group flex items-center gap-2 font-mono text-sm text-neon-cyan transition-colors hover:text-haze-100"
            >
              All projects ({projects.length})
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.1}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-3">
          <Reveal delay={0}>
            <StatCounter value={2} label="Years in Tech" />
          </Reveal>
          <Reveal delay={0.1}>
            <StatCounter value={projects.length} label="Projects Built" />
          </Reveal>
          <Reveal delay={0.2}>
            <StatCounter value={allSkills.length} label="Technologies" />
          </Reveal>
        </div>
      </section>

      {/* Latest posts */}
      {latestPosts.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="From the Blog"
              title="Latest writing"
              description="Notes on engineering, cloud and the things I'm learning along the way."
            />
            <Reveal delay={0.15}>
              <Link
                to="/blog"
                className="group flex items-center gap-2 font-mono text-sm text-neon-cyan transition-colors hover:text-haze-100"
              >
                All posts
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {latestPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.1}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-8">
        <Reveal>
          <div className="gradient-border relative overflow-hidden rounded-3xl px-8 py-14 text-center sm:px-14">
            <div
              aria-hidden="true"
              className="absolute -top-20 left-1/2 h-64 w-[34rem] -translate-x-1/2 rounded-full bg-neon-cyan/10 blur-[100px]"
            />
            <h2 className="relative font-display text-3xl font-bold text-haze-100 sm:text-4xl">
              Have a project in mind?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-haze-500">
              I'm always open to discussing new opportunities, interesting ideas, or ways to bring
              your vision to life.
            </p>
            <MagneticButton className="relative mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-violet px-8 py-4 font-semibold text-night-950 transition-shadow hover:shadow-[0_0_32px_rgba(139,92,246,0.5)]"
              >
                Let's build something great <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </MagneticButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
