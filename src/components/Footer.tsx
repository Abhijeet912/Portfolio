import { Link } from "react-router-dom";
import { site } from "../services/content";
import SocialLinks from "./SocialLinks";

const FOOTER_LINKS = [
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/certifications", label: "Certifications" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/6">
      <div className="pointer-events-none absolute inset-x-0 -top-px mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <Link to="/" className="font-display text-xl font-bold text-haze-100">
            abhijeet<span className="gradient-text">.dev</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-haze-500">{site.bio}</p>
        </div>

        <nav aria-label="Footer">
          <h3 className="font-mono text-xs tracking-[0.25em] text-haze-500 uppercase">Explore</h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {FOOTER_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="text-sm text-haze-300 transition-colors hover:text-neon-cyan">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-mono text-xs tracking-[0.25em] text-haze-500 uppercase">Connect</h3>
          <div className="mt-4">
            <SocialLinks />
          </div>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 inline-block font-mono text-sm text-haze-500 transition-colors hover:text-neon-cyan"
          >
            {site.email}
          </a>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-haze-500 sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="font-mono">
            Built with React, Vite &amp; ☕ ·{" "}
            <a href="/admin/" className="transition-colors hover:text-neon-cyan">
              Admin
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
