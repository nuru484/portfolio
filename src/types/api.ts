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
  'Dashboard',
] as const;

export type ApiTag = (typeof apiSliceTags)[number];
