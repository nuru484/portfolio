// src/validations/contact-validation.ts
import { z } from 'zod';

const optional = (max: number) =>
  z
    .string()
    .max(max)
    .optional()
    .transform((v) => (v && v.trim() ? v.trim() : undefined));

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(120, 'Name is too long')
    .transform((v) => v.trim()),
  email: z.email('A valid email is required').max(160),
  phone: optional(40),
  companyName: optional(160),
  companyWebsite: optional(200),
  budget: optional(40),
  exactBudget: optional(80),
  timeline: optional(120),
  message: z
    .string()
    .min(1, 'Message is required')
    .max(4000, 'Message is too long')
    .transform((v) => v.trim()),
});

export type IContactInput = z.infer<typeof contactSchema>;
