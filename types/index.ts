// ─── Team ──────────────────────────────────────────────────────────────────

export interface SocialLinks {
  roblox?: string;
  instagram?: string;
  tiktok?: string;
  discord?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  tags: string[];           // e.g. ['DEV', 'UNIX-INT']
  bio: string;
  image: string;            // e.g. '/images/team/mbing-sdk.png'
  social: SocialLinks;
}

// ─── Blog ──────────────────────────────────────────────────────────────────

export interface BlogSubsection {
  title: string;
  content: string;
  code?: string;
}

export interface BlogSection {
  title: string;
  content: string;
  code?: string;
  subsections?: BlogSubsection[];
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  date: string;             // ISO string: 'YYYY-MM-DD'
  readingTime?: string;     // auto-calculated if omitted
  category: string;
  author?: string;
  featured: boolean;
  image?: string;
  content?: string;         // raw HTML (optional, overrides sections)
  sections?: BlogSection[];
}

// ─── Docs ──────────────────────────────────────────────────────────────────

export interface DocSubsection {
  title: string;
  content: string;
  code?: string;
}

export interface DocSection {
  title: string;
  content: string;
  code?: string;
  tips?: string;
  subsections?: DocSubsection[];
}

export interface DocPage {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  order: number;
  sections: DocSection[];
}

// ─── Projects ──────────────────────────────────────────────────────────────

export type ProjectStatus = 'Active' | 'In Development' | 'Archived';

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;         // e.g. 'Tool', 'Library', 'Game'
  status: ProjectStatus;
  tags: string[];
  featured: boolean;
  image?: string;
  demoUrl?: string;
  repoUrl?: string;
}

// ─── FAQ ───────────────────────────────────────────────────────────────────

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

// ─── Stats ─────────────────────────────────────────────────────────────────

export interface Stat {
  label: string;
  value: string;
  icon: string;
}

// ─── Generic CRUD response ─────────────────────────────────────────────────

export type Entity = 'team' | 'blog' | 'docs' | 'projects' | 'faq';

export interface ApiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
}