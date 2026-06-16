// src/lib/users.ts
'use server';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { verifySession } from '@/lib/session';
import { BCRYPT_SALT_ROUNDS } from '@/config/constants';
import { createUserSchema } from '@/validations/user-validation';
import { ForbiddenError } from '@/middlewares/error-handler';
import type { IUser } from '@/types/user.types';

const userSelect = {
  id: true,
  email: true,
  fullname: true,
  phone: true,
  isAdmin: true,
  twoFactorEnabled: true,
  createdAt: true,
  updatedAt: true,
} as const;

async function requireAdminId(): Promise<string> {
  const { userId, isAdmin } = await verifySession();
  if (!isAdmin) throw new ForbiddenError();
  return userId;
}

export type CreateUserState = {
  success: boolean;
  message?: string;
  errors?: {
    fullname?: string[];
    email?: string[];
    phone?: string[];
    password?: string[];
    _form?: string[];
  };
};

/** Lists all active (non-soft-deleted) users. Admin only. */
export async function listUsers(): Promise<IUser[]> {
  await requireAdminId();
  return prisma.user.findMany({
    select: userSelect,
    orderBy: { createdAt: 'desc' },
  });
}

/** Creates a new user. Admin only. No public signup exists. */
export async function createUser(
  _state: CreateUserState,
  formData: FormData,
): Promise<CreateUserState> {
  try {
    await requireAdminId();
  } catch {
    return { success: false, errors: { _form: ['You are not allowed to do that.'] } };
  }

  const parsed = createUserSchema.safeParse({
    fullname: formData.get('fullname'),
    email: formData.get('email'),
    phone: formData.get('phone') || '',
    password: formData.get('password'),
    isAdmin: formData.get('isAdmin') === 'on',
  });
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const { fullname, email, phone, password, isAdmin } = parsed.data;
  const normalizedEmail = email.toLowerCase().trim();

  // findUnique is NOT soft-delete filtered, so this also catches archived
  // accounts that still hold the (unique) email.
  const existing = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    select: { id: true },
  });
  if (existing) {
    return { success: false, errors: { email: ['A user with that email already exists.'] } };
  }

  const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  await prisma.user.create({
    data: {
      email: normalizedEmail,
      fullname,
      password: hashedPassword,
      isAdmin: Boolean(isAdmin),
      ...(phone ? { phone } : {}),
    },
  });

  revalidatePath('/dashboard/users');
  return { success: true, message: 'User created.' };
}

export type DeleteUserState = { success: boolean; error?: string; message?: string };

/** Soft-deletes a user (sets deletedAt). Admin only; cannot delete yourself. */
export async function softDeleteUser(
  _state: DeleteUserState,
  formData: FormData,
): Promise<DeleteUserState> {
  let adminId: string;
  try {
    adminId = await requireAdminId();
  } catch {
    return { success: false, error: 'You are not allowed to do that.' };
  }

  const id = String(formData.get('id') ?? '');
  if (!id) return { success: false, error: 'Missing user id.' };
  if (id === adminId) return { success: false, error: 'You cannot delete your own account.' };

  // The soft-delete extension turns this delete into a deletedAt update.
  await prisma.user.delete({ where: { id } });

  revalidatePath('/dashboard/users');
  return { success: true, message: 'User removed.' };
}
