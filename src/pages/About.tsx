import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import SocialLinks from "../components/SocialLinks";
import { site } from "../services/content";
import {
  ArrowRightIcon,
  AwardIcon,
  BriefcaseIcon,
  DownloadIcon,
  GraduationIcon,
  MailIcon,
  SparklesIcon,
} from "../components/icons";

const FOCUS_AREAS = [
  "SaaS Platforms",
  "Automation",
  "Cloud Solutions",
  "AI/ML Applications",
  "System Design",
  "Scalable Backends",
];

const QUICK_FACTS = [
  { Icon: BriefcaseIcon, label: "Current Role", value: "Assistant System Engineer @ TCS" },
  { Icon: GraduationIcon, label: "Education", value: "B.Tech — JIET, Jodhpur (2024)" },
  { Icon: MailIcon, label: "Email", value: site.email },
  { Icon: SparklesIcon, label: "Interests", value: "SaaS · Automation · Cloud · AI/ML" },
];

export default function About() {
  const paragraphs = site.about.split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      <Seo
        title="About — Abhijeet Anand"
        description="Software Engineer at TCS, JIET graduate (2024). Passionate about scalable systems, cloud, DevOps and AI/ML."
        path="/about"
      />

      <section className="relative mx-auto max-w-6xl overflow-hidden px-5 py-20 sm:px-8">
        <div
          aria-hidden="true"
          className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-neon-violet/10 blur-[110px]"
        />
        <SectionHeading
          eyebrow="About Me"
          title="Engineer, builder, lifelong learner"
          description="The story so far — and where I'm headed."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left: portrait + facts */}
          <div className="space-y-6">
            <Reveal>
              <div className="gradient-border relative overflow-hidden rounded-3xl p-8">
                <div className="flex items-center gap-5">
                  <div className="glass flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl">
                    {site.profileImage ? (
                      <img src={site.profileImage} alt={site.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="font-display text-3xl font-bold gradient-text">
                        {site.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-haze-100">{site.name}</h3>
                    <p className="mt-1 font-mono text-sm text-neon-cyan">{site.role}</p>
                  </div>
                </div>
                <div className="mt-7 space-y-5">
                  {QUICK_FACTS.map(({ Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3.5">
                      <span className="glass flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                        <Icon className="h-4.5 w-4.5 text-neon-cyan" />
                      </span>
                      <div>
                        <p className="font-mono text-[11px] tracking-wider text-haze-500 uppercase">{label}</p>
                        <p className="mt-0.5 text-sm break-all text-haze-100">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-7 border-t border-white/6 pt-6">
                  <SocialLinks />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: bio */}
          <div>
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="mb-5 text-base leading-relaxed text-haze-300 sm:text-lg">{p}</p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <h3 className="mt-8 font-mono text-sm tracking-[0.25em] text-neon-cyan uppercase">
                <span className="mr-2 text-haze-500">{"//"}</span>What drives me
              </h3>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {FOCUS_AREAS.map((area) => (
                  <span
                    key={area}
                    className="glass rounded-lg px-3.5 py-2 text-sm text-haze-300 transition-all hover:-translate-y-0.5 hover:border-neon-violet/40 hover:text-neon-violet"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-4">
                {site.resumeUrl && (
                  <a
                    href={site.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-violet px-6 py-3 font-semibold text-night-950 transition-shadow hover:shadow-[0_0_24px_rgba(34,211,238,0.45)]"
                  >
                    <DownloadIcon className="h-4 w-4" /> Download Resume
                  </a>
                )}
                <Link
                  to="/certifications"
                  className="glass flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-haze-100 transition-colors hover:border-neon-cyan/40 hover:text-neon-cyan"
                >
                  <AwardIcon className="h-4 w-4" /> Certifications
                </Link>
                <Link
                  to="/experience"
                  className="group flex items-center gap-2 px-2 py-3 text-sm font-medium text-haze-300 transition-colors hover:text-neon-cyan"
                >
                  My journey <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
