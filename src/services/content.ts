import yaml from "js-yaml";
import { parseFrontmatter, toDateString } from "../utils/frontmatter";
import type {
  BlogPost,
  Certification,
  Experience,
  Project,
  SiteSettings,
  SkillCategory,
} from "../types/content";

/* ---------------------------------------------------------------- *
 * Content is stored as markdown/YAML in /content (repo root) and is
 * edited via Decap CMS at /admin. Vite inlines it at build time.
 * ---------------------------------------------------------------- */

const slugFromPath = (path: string) =>
  path
    .split("/")
    .pop()!
    .replace(/\.(md|yml|yaml)$/, "");

function loadCollection<T extends object>(
  files: Record<string, string>,
): Array<T & { slug: string; body: string }> {
  return Object.entries(files).map(([path, raw]) => {
    const { data, body } = parseFrontmatter<T>(raw);
    return { ...(data as T), slug: slugFromPath(path), body };
  });
}

/* ----------------------------- Settings ----------------------------- */

const DEFAULT_SETTINGS: SiteSettings = {
  name: "Abhijeet Anand",
  role: "Software Engineer @ TCS",
  tagline: "Engineering the future, one line of code at a time.",
  typewriter: ["Software Engineer"],
  bio: "",
  about: "",
  email: "abhijeetanand.837@gmail.com",
  profileImage: "",
  resumeUrl: "",
  github: "https://github.com/Abhijeet912/",
  linkedin: "https://www.linkedin.com/in/abhijeet-anand17/",
  leetcode: "https://leetcode.com/u/Abhi_Arcore/",
};

const settingsFiles = import.meta.glob("/content/settings/site.yml", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export const site: SiteSettings = (() => {
  const raw = Object.values(settingsFiles)[0];
  if (!raw) return DEFAULT_SETTINGS;
  const parsed = (yaml.load(raw) ?? {}) as Partial<SiteSettings>;
  return { ...DEFAULT_SETTINGS, ...parsed };
})();

/* ----------------------------- Projects ----------------------------- */

const projectFiles = import.meta.glob("/content/projects/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export const projects: Project[] = loadCollection<Omit<Project, "slug" | "body">>(projectFiles)
  .map((p) => ({
    ...p,
    date: toDateString(p.date),
    techStack: p.techStack ?? [],
    featured: Boolean(p.featured),
  }))
  .sort((a, b) => b.date.localeCompare(a.date));

export const featuredProjects: Project[] = [
  ...projects.filter((p) => p.featured),
  ...projects.filter((p) => !p.featured),
].slice(0, 3);

/* ------------------------------- Blog ------------------------------- */

const blogFiles = import.meta.glob("/content/blogs/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export const posts: BlogPost[] = loadCollection<Omit<BlogPost, "slug" | "body">>(blogFiles)
  .map((p) => ({
    ...p,
    publishedDate: toDateString(p.publishedDate),
    tags: p.tags ?? [],
    draft: Boolean(p.draft),
  }))
  .filter((p) => !p.draft)
  .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/* ---------------------------- Experience ---------------------------- */

const experienceFiles = import.meta.glob("/content/experience/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export const experience: Experience[] = loadCollection<Omit<Experience, "slug">>(experienceFiles)
  .map((e) => ({ ...e, highlights: e.highlights ?? [], order: e.order ?? 99 }))
  .sort((a, b) => a.order - b.order);

/* ------------------------------ Skills ------------------------------ */

const skillFiles = import.meta.glob("/content/skills/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export const skillCategories: SkillCategory[] = loadCollection<Omit<SkillCategory, "slug">>(
  skillFiles,
)
  .map((s) => ({ ...s, skills: s.skills ?? [], order: s.order ?? 99 }))
  .sort((a, b) => a.order - b.order);

export const allSkills: string[] = skillCategories.flatMap((c) => c.skills);

/* -------------------------- Certifications -------------------------- */

const certificationFiles = import.meta.glob("/content/certifications/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export const certifications: Certification[] = loadCollection<Omit<Certification, "slug">>(
  certificationFiles,
)
  .map((c) => ({ ...c, date: toDateString(c.date) }))
  .sort((a, b) => b.date.localeCompare(a.date));
