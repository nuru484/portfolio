// src/types/api.ts

export const apiSliceTags = [
  'Projects',
  'Project',
  'Posts',
  'Post',
  'Categories',
  'Category',
  'Testimonials',
  'Testimonial',
  'ClientLogos',
  'ClientLogo',
  'Dashboard',
] as const;

export type ApiTag = (typeof apiSliceTags)[number];
