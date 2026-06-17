// src/lib/account.ts
'use server';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { verifySession } from '@/lib/session';
import { BCRYPT_SALT_ROUNDS } from '@/config/constants';
import {
  updateProfileSchema,
  changePasswordSchema,
} from '@/validations/profile-validation';

export type ProfileState = {
  success: boolean;
  message?: string;
  errors?: {
    fullname?: string[];
    email?: string[];
    phone?: string[];
    _form?: string[];
  };
};

/** Updates the signed-in user's own profile (name, email, phone). */
export async function updateProfile(
  _state: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  let userId: string;
  try {
    ({ userId } = await verifySession());
  } catch {
    return { success: false, errors: { _form: ['You are not signed in.'] } };
  }

  const parsed = updateProfileSchema.safeParse({
    fullname: formData.get('fullname'),
    email: formData.get('email'),
    phone: formData.get('phone') || '',
  });
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const { fullname, phone } = parsed.data;
  const email = parsed.data.email.toLowerCase().trim();

  // Reject the email if another (incl. soft-deleted) account holds it.
  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
  if (existing && existing.id !== userId) {
    return {
      success: false,
      errors: { email: ['That email is already in use.'] },
    };
  }

  await prisma.user.update({
    where: { id: userId },
    data: { fullname, email, phone: phone ? phone : null },
  });

  revalidatePath('/dashboard/profile');
  revalidatePath('/dashboard');
  return { success: true, message: 'Profile updated.' };
}

export type PasswordState = {
  success: boolean;
  message?: string;
  errors?: {
    currentPassword?: string[];
    newPassword?: string[];
    confirmPassword?: string[];
    _form?: string[];
  };
};

/** Changes the signed-in user's password after verifying the current one. */
export async function changePassword(
  _state: PasswordState,
  formData: FormData,
): Promise<PasswordState> {
  let userId: string;
  try {
    ({ userId } = await verifySession());
  } catch {
    return { success: false, errors: { _form: ['You are not signed in.'] } };
  }

  const parsed = changePasswordSchema.safeParse({
    currentPassword: formData.get('currentPassword'),
    newPassword: formData.get('newPassword'),
    confirmPassword: formData.get('confirmPassword'),
  });
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const user = await prisma.user.findFirst({
    where: { id: userId },
    select: { password: true },
  });
  if (!user) {
    return { success: false, errors: { _form: ['Account not found.'] } };
  }

  const valid = await bcrypt.compare(parsed.data.currentPassword, user.password);
  if (!valid) {
    return {
      success: false,
      errors: { currentPassword: ['Current password is incorrect.'] },
    };
  }

  const hashed = await bcrypt.hash(parsed.data.newPassword, BCRYPT_SALT_ROUNDS);
  await prisma.user.update({ where: { id: userId }, data: { password: hashed } });

  return { success: true, message: 'Password updated.' };
}
