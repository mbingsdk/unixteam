'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const getInitialState = () => {
    const baseState = { opacity: 0 };
    const offset = 40;

    switch (direction) {
      case 'up':
        return { ...baseState, y: offset };
      case 'down':
        return { ...baseState, y: -offset };
      case 'left':
        return { ...baseState, x: offset };
      case 'right':
        return { ...baseState, x: -offset };
      default:
        return baseState;
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialState()}
      animate={isVisible ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
