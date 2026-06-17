// src/validations/testimonial-validation.ts
import { z } from 'zod';

const socialSchema = z.object({
  platform: z
    .string()
    .min(1, 'Platform is required')
    .max(50, 'Platform can be at most 50 characters'),
  url: z.url('Must be a valid URL').max(500, 'URL can be at most 500 characters'),
});

export const testimonialFieldsSchema = z.object({
  author: z
    .string()
    .min(1, 'Author is required')
    .max(150, 'Author can be at most 150 characters'),
  role: z
    .string()
    .min(1, 'Role is required')
    .max(200, 'Role can be at most 200 characters'),
  quote: z
    .string()
    .min(1, 'Quote is required')
    .max(2000, 'Quote can be at most 2000 characters'),
  socials: z.array(socialSchema).max(10, 'At most 10 social links').optional(),
  isPublished: z.boolean().optional(),
  displayOrder: z.number().int().min(0).optional(),
});

export const createTestimonialSchema = testimonialFieldsSchema;
export const updateTestimonialSchema = testimonialFieldsSchema.partial();

export type ICreateTestimonialInput = z.infer<typeof createTestimonialSchema>;
export type IUpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>;
