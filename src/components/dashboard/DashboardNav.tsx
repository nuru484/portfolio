// src/components/dashboard/DashboardNav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  FolderGit2,
  PenSquare,
  Quote,
  UserCog,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, adminOnly: false },
  { href: '/dashboard/projects', label: 'Projects', icon: FolderGit2, adminOnly: true },
  { href: '/dashboard/blog', label: 'Blog', icon: PenSquare, adminOnly: true },
  { href: '/dashboard/testimonials', label: 'Testimonials', icon: Quote, adminOnly: true },
  { href: '/dashboard/users', label: 'Users', icon: Users, adminOnly: true },
  { href: '/dashboard/profile', label: 'Profile', icon: UserCog, adminOnly: false },
];

export function DashboardNav({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 overflow-x-auto px-4 py-2 sm:px-0 sm:py-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {links
        .filter((l) => !l.adminOnly || isAdmin)
        .map((link) => {
          const active =
            link.href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors md:gap-2 md:px-4 md:py-2 md:text-sm',
                active
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted',
              )}
            >
              <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
              {link.label}
            </Link>
          );
        })}
    </nav>
  );
}
