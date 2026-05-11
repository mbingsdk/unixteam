'use client';

import { useEffect, useState, RefObject } from 'react';

const WORDS_PER_MINUTE = 200;

/**
 * Hitung reading time dari konten artikel di DOM.
 * @param ref - ref ke elemen artikel (article, div, dll)
 * @returns string seperti "5 menit baca"
 */
export function useReadingTime(ref: RefObject<HTMLElement | null>): string {
  const [readingTime, setReadingTime] = useState<string>('');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const text = el.innerText ?? el.textContent ?? '';
    const wordCount = text
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
    setReadingTime(`${minutes} menit baca`);
  }, [ref]);

  return readingTime;
}

/**
 * Hitung reading time dari string teks/HTML langsung (tanpa DOM).
 * Berguna untuk pre-render atau server component.
 */
export function calcReadingTimeFromString(text: string): string {
  // Strip HTML tags kalau ada
  const plain = text.replace(/<[^>]+>/g, ' ');
  const wordCount = plain
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
  return `${minutes} menit baca`;
}