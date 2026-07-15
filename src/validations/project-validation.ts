// src/validations/project-validation.ts
import { z } from 'zod';
import { youtubeVideoId } from '@/utils/youtube';

const optionalUrl = z
  .union([z.url('Must be a valid URL').max(500), z.literal('')])
  .optional()
  .transform((v) => (v ? v : undefined));

/** Case-study section: optional multi-paragraph plain text. */
const caseStudyText = z
  .string()
  .max(5000, 'At most 5000 characters')
  .optional()
  .transform((v) => (v?.trim() ? v.trim() : undefined));

const optionalYoutubeUrl = optionalUrl.refine(
  (v) => !v || youtubeVideoId(v) !== null,
  'Must be a YouTube video link (watch, share, or shorts URL)',
);

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
  overview: caseStudyText,
  problem: caseStudyText,
  solution: caseStudyText,
  outcome: caseStudyText,
  youtubeUrl: optionalYoutubeUrl,
  projectType: z.enum(['CLIENT', 'SIDE']).optional(),
  isRepoPublic: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  displayOrder: z.number().int().min(0).optional(),
});

export const createProjectSchema = projectFieldsSchema;
export const updateProjectSchema = projectFieldsSchema.partial();

export type ICreateProjectInput = z.infer<typeof createProjectSchema>;
export type IUpdateProjectInput = z.infer<typeof updateProjectSchema>;
