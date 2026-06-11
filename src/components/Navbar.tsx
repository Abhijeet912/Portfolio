import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MenuIcon, XIcon } from "./icons";
import SocialLinks from "./SocialLinks";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/certifications", label: "Certs" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on navigation + lock body scroll while open
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/6 bg-night-950/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <Link to="/" className="group flex items-center gap-2.5 font-display text-lg font-bold text-haze-100">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-neon-cyan/30 bg-night-900 font-mono text-sm text-neon-cyan transition-shadow group-hover:shadow-[0_0_18px_rgba(34,211,238,0.4)]">
            AA
          </span>
          <span className="hidden sm:block">
            abhijeet<span className="gradient-text">.dev</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `relative block px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-haze-100" : "text-haze-500 hover:text-haze-100"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-neon-cyan to-neon-violet"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="rounded-xl bg-gradient-to-r from-neon-cyan to-neon-violet px-4 py-2 text-sm font-semibold text-night-950 transition-all hover:shadow-[0_0_24px_rgba(34,211,238,0.45)]"
          >
            Hire Me
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="glass flex h-10 w-10 items-center justify-center rounded-xl text-haze-100 lg:hidden"
        >
          {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-16 z-40 flex flex-col bg-night-950/97 backdrop-blur-2xl lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
              className="flex flex-1 flex-col justify-center gap-2 px-8"
            >
              {NAV_LINKS.map(({ to, label }) => (
                <motion.li
                  key={to}
                  variants={{
                    hidden: { opacity: 0, x: -28 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.35 } },
                  }}
                >
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `block py-2 font-display text-3xl font-semibold transition-colors ${
                        isActive ? "gradient-text" : "text-haze-300 hover:text-haze-100"
                      }`
                    }
                  >
                    {label === "Certs" ? "Certifications" : label}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>
            <div className="px-8 pb-12">
              <SocialLinks />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
