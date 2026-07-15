// src/lib/api-auth.ts
import 'server-only';
import { verifySession } from '@/lib/session';
import { ForbiddenError } from '@/middlewares/error-handler';

/**
 * Guards an API route handler: throws UnauthorizedError when there's no
 * session and ForbiddenError when the session isn't an admin. Pair with
 * `handleApiError` in the route's catch block.
 */
export async function requireAdmin() {
  const session = await verifySession();
  if (!session.isAdmin) throw new ForbiddenError();
  return session;
}

/**
 * Guards a route for any authenticated user (admins and members).
 *
 * Authorization policy: members may READ dashboard data and CREATE content;
 * UPDATE is admin-only (posts additionally allow their author — enforced in
 * the post service), and publish/feature toggles and DELETE are admin-only.
 */
export async function requireUser() {
  return verifySession();
}
