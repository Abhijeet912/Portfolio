import { useState } from "react";
import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import ContactForm from "../components/ContactForm";
import SocialLinks from "../components/SocialLinks";
import { site } from "../services/content";
import { CheckIcon, CopyIcon, MailIcon } from "../components/icons";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  };

  return (
    <>
      <Seo
        title="Contact — Abhijeet Anand"
        description="Get in touch with Abhijeet Anand for opportunities, collaborations or just to say hi."
        path="/contact"
      />

      <section className="relative mx-auto max-w-6xl overflow-hidden px-5 py-20 sm:px-8">
        <div
          aria-hidden="true"
          className="absolute -top-16 left-1/4 h-72 w-72 rounded-full bg-neon-cyan/10 blur-[110px]"
        />
        <SectionHeading
          eyebrow="Contact"
          title="Let's talk"
          description="Whether it's a role, a project, or an idea worth exploring — my inbox is open."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Info column */}
          <div className="space-y-6">
            <Reveal>
              <div className="glass rounded-2xl p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-neon-cyan/30 bg-night-900">
                  <MailIcon className="h-6 w-6 text-neon-cyan" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-haze-100">Email me</h3>
                <p className="mt-1.5 text-sm text-haze-500">Fastest way to reach me — replies within 24 hours.</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${site.email}`}
                    className="font-mono text-sm break-all text-neon-cyan hover:underline"
                  >
                    {site.email}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label="Copy email address"
                    className="glass flex h-8 w-8 items-center justify-center rounded-lg text-haze-300 transition-colors hover:text-neon-cyan"
                  >
                    {copied ? <CheckIcon className="h-4 w-4 text-neon-emerald" /> : <CopyIcon className="h-4 w-4" />}
                  </button>
                  {copied && <span className="text-xs text-neon-emerald">Copied!</span>}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="glass rounded-2xl p-7">
                <h3 className="font-display text-lg font-semibold text-haze-100">Elsewhere</h3>
                <p className="mt-1.5 text-sm text-haze-500">
                  Find me on these platforms — always happy to connect.
                </p>
                <div className="mt-5">
                  <SocialLinks />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="gradient-border rounded-2xl p-7">
                <p className="flex items-center gap-2.5 font-mono text-sm text-haze-100">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-neon-emerald" />
                  Open to new opportunities
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-haze-500">
                  Currently {site.role.toLowerCase().startsWith("software") ? "a" : ""} {site.role} — and always
                  interested in challenging problems, especially around cloud, backend and AI.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Form column */}
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
