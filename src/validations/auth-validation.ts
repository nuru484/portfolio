// src/validations/auth-validation.ts
import { z } from 'zod';

/** Reusable strong-password rule. */
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(255, 'Password is too long')
  .regex(/[A-Z]/, 'Password must contain an uppercase letter')
  .regex(/[a-z]/, 'Password must contain a lowercase letter')
  .regex(/[0-9]/, 'Password must contain a number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain a special character');

export const signinSchema = z.object({
  email: z.email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .max(255, { message: 'Password is too long' }),
});

export const forgotPasswordSchema = z.object({
  email: z.email({ message: 'Enter a valid email address.' }),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Missing reset token.'),
  password: passwordSchema,
});

export const twoFactorCodeSchema = z.object({
  code: z.string().regex(/^\d{6}$/, 'Enter the 6-digit code from your email'),
});
