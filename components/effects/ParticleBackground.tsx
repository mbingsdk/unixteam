'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Jauh lebih ringan: dua orb + partikel pakai pure CSS animation
// Tidak ada 50 framer-motion instance yang jalan bersamaan
export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top } = containerRef.current.getBoundingClientRect();
      containerRef.current.style.setProperty('--mouse-x', `${e.clientX - left}px`);
      containerRef.current.style.setProperty('--mouse-y', `${e.clientY - top}px`);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ '--mouse-x': '0px', '--mouse-y': '0px' } as React.CSSProperties}
    >
      {/* Glow orbs — framer-motion ok karena cuma 2 */}
      <motion.div
        className="absolute w-96 h-96 bg-accent rounded-full blur-3xl opacity-5"
        animate={{ x: ['-25%', '25%', '-25%'], y: ['-25%', '25%', '-25%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '10%', left: '10%' }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-accent rounded-full blur-3xl opacity-5"
        animate={{ x: ['25%', '-25%', '25%'], y: ['25%', '-25%', '25%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{ bottom: '10%', right: '10%' }}
      />

      {/* CSS-only particles — zero JS per frame */}
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0);    opacity: 0.3; }
          80%  { opacity: 0.1; }
          100% { transform: translateY(-120px); opacity: 0; }
        }
        .particle {
          position: absolute;
          border-radius: 9999px;
          background: oklch(0.7 0.2 45); /* accent color */
          animation: floatUp linear infinite;
        }
      `}</style>

      {/* 20 partikel CSS — cukup visually, jauh lebih hemat dari 50 */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            width:  `${2 + (i % 4)}px`,
            height: `${2 + (i % 4)}px`,
            left:   `${(i * 5.1) % 100}%`,
            top:    `${20 + (i * 3.7) % 70}%`,
            opacity: 0.25,
            animationDuration: `${18 + (i * 1.3) % 15}s`,
            animationDelay:    `${(i * 0.7) % 8}s`,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-dark/5" />
    </div>
  );
}