import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";
import Timeline from "../components/Timeline";
import Reveal from "../components/Reveal";
import { experience } from "../services/content";
import { GraduationIcon } from "../components/icons";

export default function Experience() {
  return (
    <>
      <Seo
        title="Experience — Abhijeet Anand"
        description="Assistant System Engineer at Tata Consultancy Services, previously intern at Celebal Technologies."
        path="/experience"
      />

      <section className="relative mx-auto max-w-6xl overflow-hidden px-5 py-20 sm:px-8">
        <div
          aria-hidden="true"
          className="absolute top-24 -right-24 h-72 w-72 rounded-full bg-neon-violet/10 blur-[110px]"
        />
        <SectionHeading
          eyebrow="Experience"
          title="My professional journey"
          description="Where I've worked, what I've owned, and the systems I've helped keep running."
          align="center"
        />

        <div className="mt-16">
          <Timeline items={experience} />
        </div>

        {/* Education */}
        <div className="mx-auto mt-16 max-w-3xl">
          <Reveal>
            <div className="glass flex flex-wrap items-center gap-5 rounded-2xl p-6 transition-colors hover:border-neon-violet/30">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-neon-violet/30 bg-night-900">
                <GraduationIcon className="h-6 w-6 text-neon-violet" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-lg font-semibold text-haze-100">
                  B.Tech — Jodhpur Institute of Engineering and Technology
                </h3>
                <p className="mt-1 text-sm text-haze-500">Graduated 2024 · Jodhpur, India</p>
              </div>
              <span className="rounded-full border border-neon-violet/30 bg-neon-violet/10 px-3 py-1 font-mono text-[11px] text-neon-violet">
                Education
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
