import { motion } from "framer-motion";
import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import { skillCategories } from "../services/content";

const CATEGORY_ACCENTS = [
  { bar: "from-neon-cyan to-neon-violet", chip: "hover:border-neon-cyan/45 hover:text-neon-cyan" },
  { bar: "from-neon-violet to-neon-pink", chip: "hover:border-neon-violet/45 hover:text-neon-violet" },
  { bar: "from-neon-emerald to-neon-cyan", chip: "hover:border-neon-emerald/45 hover:text-neon-emerald" },
  { bar: "from-neon-pink to-neon-cyan", chip: "hover:border-neon-pink/45 hover:text-neon-pink" },
];

export default function Skills() {
  return (
    <>
      <Seo
        title="Skills — Abhijeet Anand"
        description="Java, Spring Boot, React, SQL, Azure, DevOps, Kubernetes, System Design and AI/ML — the toolkit I build with."
        path="/skills"
      />

      <section className="relative mx-auto max-w-6xl overflow-hidden px-5 py-20 sm:px-8">
        <div
          aria-hidden="true"
          className="absolute top-10 -left-24 h-72 w-72 rounded-full bg-neon-cyan/10 blur-[110px]"
        />
        <SectionHeading
          eyebrow="Skills"
          title="My engineering toolkit"
          description="Technologies I use to design, build and operate software — from frontend pixels to production clusters."
          align="center"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {skillCategories.map((category, i) => {
            const accent = CATEGORY_ACCENTS[i % CATEGORY_ACCENTS.length];
            return (
              <Reveal key={category.slug} delay={i * 0.08}>
                <div className="glass group h-full rounded-2xl p-7 transition-colors hover:border-white/15">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl font-semibold text-haze-100">
                      {category.category}
                    </h3>
                    <span className="font-mono text-xs text-haze-500">
                      {String(category.skills.length).padStart(2, "0")}
                    </span>
                  </div>
                  <div className={`mt-3 h-0.5 w-14 rounded-full bg-gradient-to-r ${accent.bar} transition-all duration-500 group-hover:w-24`} />

                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={{ show: { transition: { staggerChildren: 0.05 } } }}
                    className="mt-6 flex flex-wrap gap-2.5"
                  >
                    {category.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        variants={{
                          hidden: { opacity: 0, scale: 0.85, y: 8 },
                          show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
                        }}
                        className={`cursor-default rounded-lg border border-white/8 bg-white/4 px-3.5 py-2 font-mono text-sm text-haze-300 transition-all hover:-translate-y-1 ${accent.chip}`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-14 text-center font-mono text-sm text-haze-500">
            <span className="text-neon-cyan">$</span> while(alive) {"{ learn(); build(); improve(); }"}
          </p>
        </Reveal>
      </section>
    </>
  );
}
