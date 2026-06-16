// src/validations/user-validation.ts
import { z } from 'zod';
import { passwordSchema } from './auth-validation';

export const createUserSchema = z.object({
  fullname: z
    .string()
    .min(1, 'Full name is required')
    .max(100, 'Full name can be at most 100 characters'),
  email: z
    .email('Invalid email address')
    .max(255, 'Email can be at most 255 characters'),
  phone: z
    .string()
    .min(6, 'Phone number is too short')
    .max(20, 'Phone number is too long')
    .optional()
    .or(z.literal('')),
  password: passwordSchema,
  isAdmin: z.boolean().optional(),
});

export type ICreateUserSchema = z.input<typeof createUserSchema>;
