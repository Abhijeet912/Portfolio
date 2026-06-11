import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface TypeWriterProps {
  words: string[];
  className?: string;
}

export default function TypeWriter({ words, className }: TypeWriterProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced || words.length === 0) return;
    const word = words[index % words.length];
    let delay: number;
    let action: () => void;

    if (!deleting) {
      if (text.length < word.length) {
        delay = 68;
        action = () => setText(word.slice(0, text.length + 1));
      } else {
        delay = 1700;
        action = () => setDeleting(true);
      }
    } else {
      if (text.length > 0) {
        delay = 36;
        action = () => setText(word.slice(0, text.length - 1));
      } else {
        delay = 260;
        action = () => {
          setDeleting(false);
          setIndex((i) => (i + 1) % words.length);
        };
      }
    }

    const t = setTimeout(action, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, words, reduced]);

  if (words.length === 0) return null;
  if (reduced) return <span className={className}>{words[0]}</span>;

  return (
    <span className={className} aria-label={words[index % words.length]}>
      {text}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-neon-cyan" style={{ height: "1em", verticalAlign: "-0.1em" }} />
    </span>
  );
}
