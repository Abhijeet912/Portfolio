import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "../services/content";
import { CheckIcon, SendIcon } from "./icons";

type FormStatus = "idle" | "sending" | "success" | "error";

const inputClasses =
  "w-full rounded-xl border border-white/8 bg-night-900/80 px-4 py-3 text-sm text-haze-100 placeholder:text-haze-500/70 transition-all focus:border-neon-cyan/50 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.12)] focus:outline-none";

/**
 * Posts to FormSubmit's AJAX endpoint — submissions land directly in the
 * portfolio inbox. Free, no API key. (First submission triggers a one-time
 * activation email from formsubmit.co.)
 */
export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_honey")) return; // bot caught by honeypot

    setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          _subject: "New message from abhijeetanand.online",
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass flex h-full min-h-72 flex-col items-center justify-center gap-4 rounded-2xl p-10 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-neon-emerald/40 bg-neon-emerald/10">
          <CheckIcon className="h-7 w-7 text-neon-emerald" />
        </span>
        <h3 className="font-display text-xl font-semibold text-haze-100">Message sent!</h3>
        <p className="max-w-xs text-sm text-haze-500">
          Thanks for reaching out — I'll get back to you within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium text-neon-cyan hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass space-y-5 rounded-2xl p-6 sm:p-8" noValidate={false}>
      {/* Honeypot */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-2 block font-mono text-xs tracking-wider text-haze-500 uppercase">
            Name
          </label>
          <input id="cf-name" name="name" type="text" required placeholder="Your name" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-2 block font-mono text-xs tracking-wider text-haze-500 uppercase">
            Email
          </label>
          <input id="cf-email" name="email" type="email" required placeholder="you@example.com" className={inputClasses} />
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-2 block font-mono text-xs tracking-wider text-haze-500 uppercase">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={6}
          placeholder="Tell me about your project, idea, or opportunity…"
          className={`${inputClasses} resize-none`}
        />
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-2.5 text-sm text-red-300"
            role="alert"
          >
            Something went wrong. Please try again, or email me directly at {site.email}.
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={status === "sending"}
        whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-violet px-6 py-3.5 font-semibold text-night-950 transition-shadow hover:shadow-[0_0_28px_rgba(34,211,238,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-night-950/30 border-t-night-950" />
            Sending…
          </>
        ) : (
          <>
            <SendIcon className="h-4 w-4" />
            Send Message
          </>
        )}
      </motion.button>
    </form>
  );
}
