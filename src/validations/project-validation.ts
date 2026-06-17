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
    .max(80, 'Title can be at most 80 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(200, 'Description can be at most 200 characters'),
  technologies: z
    .array(z.string().min(1).max(30))
    .min(1, 'Add at least one technology')
    .max(8, 'At most 8 technologies'),
  githubUrl: optionalUrl,
  liveUrl: optionalUrl,
  isPublished: z.boolean().optional(),
  displayOrder: z.number().int().min(0).optional(),
});

export const createProjectSchema = projectFieldsSchema;
export const updateProjectSchema = projectFieldsSchema.partial();

export type ICreateProjectInput = z.infer<typeof createProjectSchema>;
export type IUpdateProjectInput = z.infer<typeof updateProjectSchema>;
