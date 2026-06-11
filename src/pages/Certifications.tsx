import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import { certifications } from "../services/content";
import { AwardIcon, ExternalLinkIcon } from "../components/icons";
import { formatDate } from "../utils/frontmatter";

export default function Certifications() {
  return (
    <>
      <Seo
        title="Certifications — Abhijeet Anand"
        description="Professional certifications and credentials earned by Abhijeet Anand."
        path="/certifications"
      />

      <section className="relative mx-auto max-w-6xl overflow-hidden px-5 py-20 sm:px-8">
        <div
          aria-hidden="true"
          className="absolute -top-10 left-1/3 h-72 w-72 rounded-full bg-neon-cyan/10 blur-[110px]"
        />
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials & badges"
          description="Proof of continuous learning — certifications I've earned along the way."
          align="center"
        />

        {certifications.length > 0 ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, i) => (
              <Reveal key={cert.slug} delay={i * 0.08}>
                <div className="glass group h-full rounded-2xl p-6 transition-all hover:-translate-y-1.5 hover:border-neon-cyan/35 hover:shadow-[0_14px_44px_-12px_rgba(34,211,238,0.3)]">
                  {cert.image ? (
                    <img
                      src={cert.image}
                      alt={`${cert.title} badge`}
                      loading="lazy"
                      className="h-16 w-16 rounded-xl object-contain"
                    />
                  ) : (
                    <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-neon-cyan/30 bg-night-900">
                      <AwardIcon className="h-7 w-7 text-neon-cyan" />
                    </span>
                  )}
                  <h3 className="mt-5 font-display text-lg leading-snug font-semibold text-haze-100 transition-colors group-hover:text-neon-cyan">
                    {cert.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-haze-500">{cert.issuer}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="font-mono text-xs text-haze-500">{formatDate(cert.date)}</span>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-medium text-neon-cyan hover:underline"
                      >
                        Verify <ExternalLinkIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="glass mx-auto mt-14 max-w-lg rounded-2xl p-12 text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-neon-violet/30 bg-night-900">
                <AwardIcon className="h-8 w-8 text-neon-violet" />
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold text-haze-100">
                Certifications loading…
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-haze-500">
                New credentials are on the way. Meanwhile, the admin panel at{" "}
                <code className="rounded bg-night-800 px-1.5 py-0.5 font-mono text-xs text-neon-cyan">/admin</code>{" "}
                makes adding them a 30-second job.
              </p>
            </div>
          </Reveal>
        )}
      </section>
    </>
  );
}
