export type ProjectStatus = "ongoing" | "completed" | "deployed";

export interface SiteSettings {
  name: string;
  role: string;
  tagline: string;
  typewriter: string[];
  bio: string;
  about: string;
  email: string;
  profileImage?: string;
  resumeUrl?: string;
  github: string;
  linkedin: string;
  leetcode?: string;
}

export interface Project {
  slug: string;
  title: string;
  date: string;
  status: ProjectStatus;
  featured: boolean;
  image?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  description: string;
  body: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  publishedDate: string;
  summary: string;
  coverImage?: string;
  tags: string[];
  draft: boolean;
  body: string;
}

export interface Experience {
  slug: string;
  company: string;
  role: string;
  duration: string;
  order: number;
  description: string;
  highlights: string[];
}

export interface SkillCategory {
  slug: string;
  category: string;
  order: number;
  skills: string[];
}

export interface Certification {
  slug: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  image?: string;
}
