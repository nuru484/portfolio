// src/components/dashboard/DashboardNav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { dashboardLinks, isActiveLink } from './nav-links';

/** Desktop horizontal nav (sm and up). The mobile drawer lives in MobileNav. */
export function DashboardNav({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1">
      {dashboardLinks
        .filter((l) => !l.adminOnly || isAdmin)
        .map((link) => {
          const active = isActiveLink(link.href, pathname);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors lg:px-4',
                active
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted',
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
    </nav>
  );
}
