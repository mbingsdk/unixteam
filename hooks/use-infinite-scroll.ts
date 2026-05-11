import { useState, useRef, useEffect } from 'react';

/**
 * Hook infinite scroll berbasis IntersectionObserver.
 * - Auto-reset visibleCount kalau `items` berubah (filter/search).
 * - Sentinel div yang di-return harus diletakkan setelah list item.
 */
export function useInfiniteScroll<T>(items: T[], pageSize = 8) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Reset ke halaman pertama setiap kali items berubah
  useEffect(() => {
    setVisibleCount(pageSize);
  }, [items, pageSize]);

  const hasMore = visibleCount < items.length;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + pageSize, items.length));
        }
      },
      // Trigger 300px sebelum sentinel kelihatan lebih smooth
      { rootMargin: '300px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, pageSize, items.length]);

  return {
    visibleItems: items.slice(0, visibleCount),
    sentinelRef,
    hasMore,
  };
}