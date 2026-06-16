// src/validations/project-validation.ts
import { z } from 'zod';

const optionalUrl = z
  .union([z.url('Must be a valid URL').max(500), z.literal('')])
  .optional()
  .transform((v) => (v ? v : undefined));

export const projectFieldsSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255, 'Title can be at most 255 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(1000, 'Description can be at most 1000 characters'),
  technologies: z
    .array(z.string().min(1).max(50))
    .min(1, 'Add at least one technology')
    .max(20, 'At most 20 technologies'),
  githubUrl: optionalUrl,
  liveUrl: optionalUrl,
  isPublished: z.boolean().optional(),
  displayOrder: z.number().int().min(0).optional(),
});

export const createProjectSchema = projectFieldsSchema;
export const updateProjectSchema = projectFieldsSchema.partial();

export type ICreateProjectInput = z.infer<typeof createProjectSchema>;
export type IUpdateProjectInput = z.infer<typeof updateProjectSchema>;
