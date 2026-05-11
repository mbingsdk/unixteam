/**
 * lib/motion.ts
 *
 * Reusable Framer Motion variants dengan spring physics macOS/iOS.
 * Import dan pakai di semua components untuk feel yang konsisten.
 */

import { type Transition, type Variants } from 'framer-motion';

// ── Spring presets ─────────────────────────────────────────────────────────

/** Snappy — untuk UI elements (button, badge, tag) */
export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 35,
  mass: 0.6,
};

/** Smooth — untuk cards, panels */
export const springSmooth: Transition = {
  type: 'spring',
  stiffness: 350,
  damping: 30,
  mass: 0.8,
};

/** Gentle — untuk page sections, large elements */
export const springGentle: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 28,
  mass: 1,
};

/** Bouncy — untuk modals, popovers */
export const springBouncy: Transition = {
  type: 'spring',
  stiffness: 450,
  damping: 22,
  mass: 0.7,
};

// ── Card variants ──────────────────────────────────────────────────────────

export const cardVariants: Variants = {
  rest: {
    y: 0,
    scale: 1,
    transition: springSmooth,
  },
  hover: {
    y: -6,
    scale: 1.012,
    transition: springSmooth,
  },
  tap: {
    scale: 0.975,
    y: -2,
    transition: springSnappy,
  },
};

export const cardVariantsHorizontal: Variants = {
  rest: { x: 0, scale: 1, transition: springSmooth },
  hover: { x: 6, scale: 1.008, transition: springSmooth },
  tap: { scale: 0.975, x: 2, transition: springSnappy },
};

// ── Fade + blur enter ──────────────────────────────────────────────────────

/**
 * Dipakai dengan `custom` prop untuk staggered delay.
 * @example
 * <motion.div variants={fadeUpVariants} custom={index} initial="hidden" animate="visible" />
 */
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(6px)',
  },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      ...springGentle,
      delay: i * 0.07,
      opacity: { duration: 0.4, delay: i * 0.07 },
    },
  }),
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0, filter: 'blur(4px)' },
  visible: (i: number = 0) => ({
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.4,
      delay: i * 0.06,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export const fadeDownVariants: Variants = {
  hidden: { opacity: 0, y: -16, filter: 'blur(4px)' },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { ...springSmooth, delay: i * 0.06 },
  }),
};

// ── Scale + fade (modal/popover) ───────────────────────────────────────────

export const popoverVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    y: -8,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: springBouncy,
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: -4,
    filter: 'blur(4px)',
    transition: {
      duration: 0.2,
      ease: [0.36, 0, 0.66, 0],
    },
  },
};

export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 20, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: springBouncy,
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 10,
    transition: { duration: 0.18, ease: [0.36, 0, 0.66, 0] },
  },
};

// ── Drawer / Sheet (bottom) ────────────────────────────────────────────────

export const drawerVariants: Variants = {
  hidden: { y: '100%', opacity: 0.8 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { ...springSmooth, stiffness: 380, damping: 32 },
  },
  exit: {
    y: '100%',
    opacity: 0.8,
    transition: { duration: 0.25, ease: [0.36, 0, 0.66, 0] },
  },
};

// ── List stagger container ─────────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springSmooth,
  },
};

// ── Button / interactive ───────────────────────────────────────────────────

export const buttonTap = {
  whileTap: { scale: 0.97 },
  transition: springSnappy,
};

export const iconHover: Variants = {
  rest: { rotate: 0, scale: 1 },
  hover: { rotate: 8, scale: 1.1, transition: springSnappy },
};

// ── Overlay / backdrop ─────────────────────────────────────────────────────

export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// ── macOS window-style enter ───────────────────────────────────────────────

export const windowVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.88,
    y: 24,
    filter: 'blur(16px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      ...springBouncy,
      stiffness: 480,
      damping: 26,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    filter: 'blur(8px)',
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

// ── Scroll reveal — gunakan sebagai pengganti ScrollReveal.tsx ─────────────

export const scrollRevealVariants: Variants = {
  offscreen: { opacity: 0, y: 24, filter: 'blur(4px)' },
  onscreen: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { ...springGentle, delay: i * 0.08 },
  }),
};

export const scrollRevealViewport = { once: true, amount: 0.12 };