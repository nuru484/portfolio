// src/static-data/motion-variants.ts
import { Variants } from 'motion/react';

/**
 * Container — staggers its children's entrance.
 * Pair with `itemVariants` on each child.
 */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/**
 * Item — fade/slide in from the left (used inside a staggered container,
 * e.g. the mobile nav links).
 */
export const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 100, damping: 18 },
  },
};

/**
 * Generic fade up (utility) — for sections/text revealed on scroll.
 */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Mobile menu panel — slides in from the right edge.
 */
export const mobileMenuVariants: Variants = {
  closed: { x: '100%' },
  open: {
    x: 0,
    transition: { type: 'spring', stiffness: 150, damping: 20 },
  },
};
