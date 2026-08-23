// src/hooks/use-current-path.ts
'use client';

import { useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';

/** Trailing slashes and an empty root both mean "/". */
export function normalizePath(path: string | null | undefined): string {
  if (!path) return '/';
  const trimmed = path.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

// usePathname re-renders the component on every client navigation, so the
// snapshot below is re-read then; nothing else needs to be subscribed to.
const subscribe = () => () => {};

/**
 * The path currently being viewed.
 *
 * `usePathname()` alone is not enough on a statically prerendered route: the
 * value is baked at build time, and on the home page it comes back as
 * something other than "/", so the nav rendered no active link until a client
 * navigation replaced it. Reading the live location through
 * useSyncExternalStore lets the prerendered HTML use the router value and then
 * corrects it on hydration, which is what that hook exists for - no mismatch
 * warning, and it self-heals whatever the build baked in.
 */
export function useCurrentPath(): string {
  const routerPath = usePathname();
  return useSyncExternalStore(
    subscribe,
    () => normalizePath(window.location.pathname),
    () => normalizePath(routerPath),
  );
}
