'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src?: string | null;
  alt: string;
  fallback: React.ReactNode;
  fill?: boolean;
  className?: string;
  sizes?: string;
  loading?: 'eager' | 'lazy';
}

/**
 * Tampilkan gambar kalau `src` ada.
 * Kalau `src` kosong/null atau gambar gagal load → tampilkan `fallback`.
 */
export default function ImageWithFallback({
  src,
  alt,
  fallback,
  fill = true,
  className = 'object-cover',
  sizes = '(max-width: 768px) 100vw, 50vw',
  loading = 'lazy',
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return <>{fallback}</>;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
      loading={loading}
      onError={() => setError(true)}
    />
  );
}