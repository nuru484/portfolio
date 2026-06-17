// src/components/dashboard/nav-links.ts
import {
  LayoutDashboard,
  Users,
  FolderGit2,
  PenSquare,
  Quote,
  UserCog,
  type LucideIcon,
} from 'lucide-react';

export interface DashboardLink {
  href: string;
  label: string;
  icon: LucideIcon;
  adminOnly: boolean;
}

export const dashboardLinks: DashboardLink[] = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, adminOnly: false },
  { href: '/dashboard/projects', label: 'Projects', icon: FolderGit2, adminOnly: false },
  { href: '/dashboard/blog', label: 'Blog', icon: PenSquare, adminOnly: false },
  { href: '/dashboard/testimonials', label: 'Testimonials', icon: Quote, adminOnly: false },
  { href: '/dashboard/users', label: 'Users', icon: Users, adminOnly: true },
  { href: '/dashboard/profile', label: 'Profile', icon: UserCog, adminOnly: false },
];

/** True when `pathname` is the active route for `href`. */
export function isActiveLink(href: string, pathname: string): boolean {
  return href === '/dashboard'
    ? pathname === '/dashboard'
    : pathname.startsWith(href);
}
