import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Hitung estimasi waktu baca dari sekumpulan sections blog/docs.
 * Asumsi: 200 kata per menit (kecepatan baca rata-rata bahasa Indonesia).
 */
export function calcReadingTime(
  sections?: Array<{
    content: string;
    title?: string;
    subsections?: Array<{ content: string; title?: string }>;
    code?: string;
  }>
): string {
  if (!sections || sections.length === 0) return '1 menit baca';

  const WORDS_PER_MINUTE = 200;
  let totalWords = 0;

  for (const section of sections) {
    totalWords += countWords(section.title ?? '');
    totalWords += countWords(section.content);
    // Code blocks dihitung lebih lambat
    if (section.code) totalWords += Math.ceil(countWords(section.code) * 0.5);

    for (const sub of section.subsections ?? []) {
      totalWords += countWords(sub.title ?? '');
      totalWords += countWords(sub.content);
    }
  }

  const minutes = Math.max(1, Math.ceil(totalWords / WORDS_PER_MINUTE));
  return `${minutes} menit baca`;
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}