import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const WORDS_PER_MINUTE = 200;

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Strip HTML tags dan hitung kata.
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ');
}

/**
 * Hitung estimasi waktu baca.
 * Support tiga format:
 *  1. sections array (BlogSection[])
 *  2. raw HTML string (field `content`)
 *  3. undefined → '1 menit baca'
 */
export function calcReadingTime(
  sections?: Array<{
    content: string;
    title?: string;
    subsections?: Array<{ content: string; title?: string }>;
    code?: string;
  }>,
  htmlContent?: string,
): string {
  let totalWords = 0;

  // Kalau ada HTML content (override sections)
  if (htmlContent) {
    totalWords += countWords(stripHtml(htmlContent));
  }

  // Hitung dari sections
  if (sections && sections.length > 0) {
    for (const section of sections) {
      totalWords += countWords(section.title ?? '');
      totalWords += countWords(section.content);
      // Code block dihitung lebih lambat
      if (section.code) totalWords += Math.ceil(countWords(section.code) * 0.5);

      for (const sub of section.subsections ?? []) {
        totalWords += countWords(sub.title ?? '');
        totalWords += countWords(sub.content);
      }
    }
  }

  if (totalWords === 0) return '1 menit baca';

  const minutes = Math.max(1, Math.ceil(totalWords / WORDS_PER_MINUTE));
  return `${minutes} menit baca`;
}