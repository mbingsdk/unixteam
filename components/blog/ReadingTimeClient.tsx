'use client';

import { useEffect, useRef, useState } from 'react';
import { Clock } from 'lucide-react';

const WORDS_PER_MINUTE = 200;

interface ReadingTimeClientProps {
  /** Selector CSS ke elemen yang isinya mau dihitung. Default: 'article' */
  selector?: string;
  /** Fallback kalau DOM belum ready (biasanya dari server props) */
  fallback?: string;
  className?: string;
  showIcon?: boolean;
}

/**
 * Hitung reading time langsung dari konten yang ter-render di DOM.
 * Dipake di halaman blog post biar hitungannya beneran sesuai konten,
 * bukan static string yang di-embed pas build.
 */
export default function ReadingTimeClient({
  selector = 'article',
  fallback,
  className,
  showIcon = true,
}: ReadingTimeClientProps) {
  const [readingTime, setReadingTime] = useState<string>(fallback ?? '');

  useEffect(() => {
    // Tunggu konten selesai render
    const calculate = () => {
      const el = document.querySelector(selector);
      if (!el) return;

      const text = (el as HTMLElement).innerText ?? el.textContent ?? '';
      const wordCount = text
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;

      const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
      setReadingTime(`${minutes} menit baca`);
    };

    // Jalankan setelah paint pertama
    if (document.readyState === 'complete') {
      calculate();
    } else {
      window.addEventListener('load', calculate, { once: true });
    }

    // Fallback: coba lagi 300ms kemudian (buat konten yang render async)
    const timer = setTimeout(calculate, 300);

    return () => clearTimeout(timer);
  }, [selector]);

  if (!readingTime) return null;

  return (
    <span className={className}>
      {showIcon && <Clock size={16} className="inline mr-1 -mt-0.5" />}
      {readingTime}
    </span>
  );
}