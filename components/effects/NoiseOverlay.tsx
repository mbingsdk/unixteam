'use client';

/**
 * components/effects/NoiseOverlay.tsx
 *
 * Subtle grain/noise texture overlay — bikin glass effect terasa lebih
 * material dan premium, mirip macOS menubar.
 *
 * Taruh SATU kali di app/layout.tsx, sebelum </body>:
 *   <NoiseOverlay />
 *
 * Props:
 *   opacity — intensitas grain (default: 0.028 — sangat subtle)
 *   blend   — CSS mix-blend-mode (default: 'overlay')
 */

interface NoiseOverlayProps {
  opacity?: number;
  blend?: 'overlay' | 'soft-light' | 'screen' | 'multiply';
  className?: string;
}

export default function NoiseOverlay({
  opacity = 0.028,
  blend = 'overlay',
  className = '',
}: NoiseOverlayProps) {
  return (
    <svg
      className={`pointer-events-none fixed inset-0 z-[9999] h-full w-full ${className}`}
      style={{ opacity, mixBlendMode: blend }}
      aria-hidden="true"
      role="presentation"
      focusable="false"
    >
      <filter id="unix-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.62"
          numOctaves="4"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#unix-noise)" />
    </svg>
  );
}