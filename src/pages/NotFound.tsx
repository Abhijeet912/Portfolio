import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "../components/Seo";
import MagneticButton from "../components/MagneticButton";
import { ArrowRightIcon } from "../components/icons";

export default function NotFound() {
  return (
    <>
      <Seo title="404 — Page Not Found" description="This page doesn't exist." path="/404" />
      <section className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center overflow-hidden px-5 text-center sm:px-8">
        <div
          aria-hidden="true"
          className="absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-neon-violet/12 blur-[110px]"
        />
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="font-display text-[7rem] leading-none font-bold gradient-text sm:text-[10rem]"
        >
          404
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
        >
          <p className="font-mono text-sm text-haze-500">
            <span className="text-neon-cyan">$</span> cd: no such file or directory
          </p>
          <h1 className="mt-4 font-display text-2xl font-semibold text-haze-100 sm:text-3xl">
            This route doesn't exist
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-haze-500">
            The page you're looking for was moved, deleted, or never deployed in the first place.
          </p>
          <MagneticButton className="mt-9">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-violet px-7 py-3.5 font-semibold text-night-950 transition-shadow hover:shadow-[0_0_28px_rgba(34,211,238,0.45)]"
            >
              Back to home <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </MagneticButton>
        </motion.div>
      </section>
    </>
  );
}
