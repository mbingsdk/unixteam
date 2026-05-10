/**
 * lib/data.ts
 *
 * Helper buat baca data JSON.
 * Dipakai oleh halaman Next.js (server component, generateStaticParams, dll).
 *
 * Di static build, ini akan di-bundle saat build time.
 * Di dev, data langsung dibaca dari file JSON (setelah admin save).
 */

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
  readingTime: p.readingTime ?? calcReadingTime(p.sections),
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

/** Ambil semua kategori unik dari array */
export function uniqueCategories<T extends { category: string }>(items: T[]) {
  return [...new Set(items.map((i) => i.category))].sort();
}