// lib/data.ts — updated agar reading time dihitung dari content HTML juga

import teamData from '@/data/team.json';
import blogData from '@/data/blog.json';
import docsData from '@/data/docs.json';
import projectsData from '@/data/projects.json';
import faqData from '@/data/faq.json';

import type { TeamMember, BlogPost, DocPage, Project, FaqItem } from '@/types';
import { calcReadingTime } from '@/lib/utils';

// ── Team ──────────────────────────────────────────────────────────────────

export const teamMembers: TeamMember[] = teamData as TeamMember[];

// ── Blog ──────────────────────────────────────────────────────────────────

export const blogPosts: BlogPost[] = (blogData as BlogPost[]).map((p) => ({
  ...p,
  // Kalau readingTime sudah ada di JSON, pakai itu.
  // Kalau belum, hitung dari sections dan/atau content HTML.
  readingTime:
    p.readingTime ??
    calcReadingTime(p.sections, p.content /* raw HTML string */),
}));

export const featuredBlogPosts = [...blogPosts]
  .filter((p) => p.featured)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// ── Docs ──────────────────────────────────────────────────────────────────

export const docPages: DocPage[] = (docsData as DocPage[]).sort(
  (a, b) => a.order - b.order,
);

// ── Projects ──────────────────────────────────────────────────────────────

export const projects: Project[] = projectsData as Project[];

export const featuredProjects = projects.filter((p) => p.featured);

// ── FAQ ───────────────────────────────────────────────────────────────────

export const faqItems: FaqItem[] = faqData as FaqItem[];

// ── Util ──────────────────────────────────────────────────────────────────

export function uniqueCategories<T extends { category: string }>(items: T[]) {
  return [...new Set(items.map((i) => i.category))].sort();
}