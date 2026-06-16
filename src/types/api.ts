// src/types/api.ts

export const apiSliceTags = ['Projects', 'Project'] as const;

export type ApiTag = (typeof apiSliceTags)[number];
