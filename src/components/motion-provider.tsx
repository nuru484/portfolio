// src/components/motion-provider.tsx
'use client';

import { MotionConfig } from 'motion/react';

/**
 * The global reduced-motion rule in globals.css only reaches CSS animations
 * and transitions. Motion drives its animations from JavaScript, so it needs
 * telling separately: "user" makes it drop transform and layout animation
 * whenever the visitor asks for reduced motion.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
