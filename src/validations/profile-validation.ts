// src/validations/profile-validation.ts
import { z } from 'zod';
import { passwordSchema } from './auth-validation';

export const updateProfileSchema = z.object({
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
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type IUpdateProfileSchema = z.input<typeof updateProfileSchema>;
export type IChangePasswordSchema = z.input<typeof changePasswordSchema>;
