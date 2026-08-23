// src/validations/client-logo-validation.ts
import { z } from 'zod';

// The stored value becomes an href on the public site, so the scheme is
// pinned here at the write boundary rather than sanitised at render time.
const optionalUrl = z
  .union([
    z
      .url('Must be a valid URL')
      .max(500)
      .refine(
        (v) => /^https?:\/\//i.test(v),
        'Must start with http:// or https://',
      ),
    z.literal(''),
  ])
  .optional()
  .transform((v) => (v ? v : undefined));

export const clientLogoFieldsSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(150, 'Name can be at most 150 characters'),
  websiteUrl: optionalUrl,
  isPublished: z.boolean().optional(),
  displayOrder: z.number().int().min(0).optional(),
});

export const createClientLogoSchema = clientLogoFieldsSchema;
export const updateClientLogoSchema = clientLogoFieldsSchema.partial();

export type ICreateClientLogoInput = z.infer<typeof createClientLogoSchema>;
export type IUpdateClientLogoInput = z.infer<typeof updateClientLogoSchema>;
