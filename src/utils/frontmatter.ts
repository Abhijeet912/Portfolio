import yaml from "js-yaml";

/** Minimal, browser-safe frontmatter parser (no Buffer dependency). */
export function parseFrontmatter<T>(raw: string): { data: T; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw.trim());
  if (!match) return { data: {} as T, body: raw.trim() };
  const data = (yaml.load(match[1]) ?? {}) as T;
  return { data, body: match[2].trim() };
}

/** YAML may parse dates as Date objects — normalize to YYYY-MM-DD strings. */
export function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string") return value.slice(0, 10);
  return "";
}

export function formatDate(value: unknown): string {
  const s = toDateString(value);
  if (!s) return "";
  const d = new Date(`${s}T00:00:00`);
  if (Number.isNaN(d.getTime())) return s;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function readingTime(text: string): string {
  const words = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}
