// src/lib/session.ts
import 'server-only';
import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { ENV } from '@/config/env';
import { UnauthorizedError } from '@/middlewares/error-handler';

const encodedKey = new TextEncoder().encode(ENV.SESSION_SECRET);

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;
const SESSION_DURATION = '7d';

export interface SessionPayload extends JWTPayload {
  userId: string;
  isAdmin: boolean;
  expiresAt: Date;
}

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(encodedKey);
}

export async function decrypt(
  session: string | undefined,
): Promise<SessionPayload | null> {
  if (!session) return null;

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload as SessionPayload;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Failed to verify session:', message);
    return null;
  }
}

export async function createSession(
  userId: string,
  isAdmin: boolean,
): Promise<void> {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const session = await encrypt({ userId, isAdmin, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: ENV.IS_PRODUCTION,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

// Throws UnauthorizedError — use in API route handlers / server actions.
export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value;
  const session = await decrypt(cookie);

  if (!session || !session.userId) {
    throw new UnauthorizedError();
  }

  return { isAuth: true, userId: session.userId, isAdmin: session.isAdmin };
});

// Redirects — use in Server Components and protected layouts.
export const requireSession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value;
  const session = await decrypt(cookie);

  if (!session || !session.userId) {
    redirect('/login');
  }

  return { isAuth: true, userId: session.userId, isAdmin: session.isAdmin };
});
