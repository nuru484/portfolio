// src/components/ThemeToggle.tsx
'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  iconClassName?: string;
}

/**
 * Theme switch button. `resolvedTheme` is undefined on the server and during
 * the first client render, so we only render the icon once it's resolved —
 * this avoids a hydration mismatch without a setState-in-effect mount guard.
 */
export function ThemeToggle({ className, iconClassName }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const themeReady = resolvedTheme !== undefined;
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'inline-flex items-center justify-center rounded-full transition-colors cursor-pointer',
        className
      )}
    >
      {themeReady ? (
        isDark ? (
          <Sun className={cn('h-5 w-5', iconClassName)} />
        ) : (
          <Moon className={cn('h-5 w-5', iconClassName)} />
        )
      ) : (
        <span className={cn('block h-5 w-5', iconClassName)} />
      )}
    </button>
  );
}
