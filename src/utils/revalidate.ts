// src/utils/revalidate.ts
import 'server-only';
import { revalidatePath } from 'next/cache';

/**
 * Invalidates the statically-cached public pages that render projects, so
 * admin changes appear without a redeploy (on-demand ISR).
 */
export function revalidatePublicProjects(): void {
  revalidatePath('/');
  revalidatePath('/projects');
}
