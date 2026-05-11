'use client';

/**
 * hooks/use-reduced-motion.ts
 *
 * Deteksi preferensi pengguna soal animasi (prefers-reduced-motion).
 * Wajib dipakai di semua animasi — aksesibilitas + baterai HP.
 *
 * Usage:
 *   const reduced = useReducedMotion();
 *   <motion.div
 *     animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
 *   />
 *
 *   // Atau lewat Framer Motion bawaan:
 *   import { useReducedMotion } from 'framer-motion';
 *   // Tapi hook ini lebih lengkap (real-time update + SSR safe)
 */

import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    // SSR safe — default false
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    setReduced(mq.matches);

    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}

/**
 * Return transition yang sudah disesuaikan dengan preferensi pengguna.
 *
 * Usage:
 *   const transition = useAdaptiveTransition({ type: 'spring', stiffness: 400, damping: 30 });
 *   <motion.div transition={transition} />
 */
export function useAdaptiveTransition(
  normalTransition: Record<string, unknown>,
) {
  const reduced = useReducedMotion();
  if (reduced) {
    return { duration: 0.01, ease: 'linear' };
  }
  return normalTransition;
}