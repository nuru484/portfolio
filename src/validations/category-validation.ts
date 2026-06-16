// src/validations/category-validation.ts
import { z } from 'zod';

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name can be at most 100 characters'),
});

export type ICategoryInput = z.infer<typeof categorySchema>;
