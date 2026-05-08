'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const generateParticles = (count: number = 50): Particle[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 20,
    delay: Math.random() * 5,
  }));
};

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>(generateParticles());

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { left, top } = containerRef.current.getBoundingClientRect();
      const x = clientX - left;
      const y = clientY - top;

      // Create subtle parallax effect
      containerRef.current.style.setProperty('--mouse-x', `${x}px`);
      containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        '--mouse-x': '0px',
        '--mouse-y': '0px',
      } as React.CSSProperties}
    >
      {/* Glow Orbs */}
      <motion.div
        className="absolute w-96 h-96 bg-accent rounded-full blur-3xl opacity-5"
        animate={{
          x: ['-25%', '25%', '-25%'],
          y: ['-25%', '25%', '-25%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ top: '10%', left: '10%' }}
      />

      <motion.div
        className="absolute w-96 h-96 bg-accent rounded-full blur-3xl opacity-5"
        animate={{
          x: ['25%', '-25%', '25%'],
          y: ['25%', '-25%', '25%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ bottom: '10%', right: '10%' }}
      />

      {/* Particles */}
      {particlesRef.current.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-accent"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: 0.3,
          }}
          animate={{
            y: [0, -100],
            opacity: [0.3, 0.1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-dark/5" />
    </div>
  );
}
