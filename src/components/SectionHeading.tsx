import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const center = align === "center";
  return (
    <Reveal className={center ? "text-center" : ""}>
      <p className="font-mono text-sm tracking-[0.25em] text-neon-cyan uppercase">
        <span className="mr-2 text-haze-500">{"//"}</span>
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold text-haze-100 sm:text-4xl lg:text-[2.6rem]">
        {title}
      </h2>
      {description && (
        <p className={`mt-4 max-w-2xl text-base leading-relaxed text-haze-500 ${center ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
