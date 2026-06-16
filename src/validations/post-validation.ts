// src/validations/post-validation.ts
import { z } from 'zod';
import { parseBoolean } from '@/utils/parse-booleans';

// Each helper preserves `undefined` (field absent → leave unchanged) and maps
// empty/"null" to an explicit `null` (clear the value).
const categoryId = z
  .union([z.string(), z.null()])
  .optional()
  .transform((v) =>
    v === undefined ? undefined : v && v !== '' && v !== 'null' && v !== 'undefined' ? v : null,
  );

const boolField = z
  .union([z.boolean(), z.string()])
  .optional()
  .transform((v) => (v === undefined ? undefined : parseBoolean(v)));

const publishDate = z
  .union([z.string(), z.null()])
  .optional()
  .transform((v) =>
    v === undefined ? undefined : v && v !== '' && v !== 'null' ? v : null,
  );

export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  excerpt: z
    .string()
    .min(1, 'Excerpt is required')
    .max(500, 'Excerpt is too long'),
  content: z.string().min(1, 'Content is required'),
  categoryId,
  isPublished: boolField,
  isFeatured: boolField,
  publishDate,
});

export const updatePostSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  excerpt: z.string().min(1).max(500).optional(),
  content: z.string().min(1).optional(),
  categoryId,
  isPublished: boolField,
  isFeatured: boolField,
  publishDate,
});

export type ICreatePostInput = z.infer<typeof createPostSchema>;
export type IUpdatePostInput = z.infer<typeof updatePostSchema>;
