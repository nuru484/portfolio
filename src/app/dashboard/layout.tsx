// src/app/dashboard/layout.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { requireSession } from '@/lib/session';
import { DashboardNav } from '@/components/dashboard/DashboardNav';
import { LogoutButton } from '@/components/dashboard/LogoutButton';
import { ThemeToggle } from '@/components/ThemeToggle';

export const metadata: Metadata = {
  title: { default: 'Dashboard', template: '%s | Dashboard' },
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Redirects to /login if there is no valid session.
  const { isAdmin } = await requireSession();

  return (
    <div className="min-h-screen bg-background font-urbanist flex flex-col">
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-lg font-semibold tracking-tight">
              Portfolio<span className="text-muted-foreground"> Admin</span>
            </Link>
            <div className="hidden sm:block">
              <DashboardNav isAdmin={isAdmin} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle className="w-9 h-9 border border-border text-foreground hover:bg-muted" />
            <LogoutButton />
          </div>
        </div>
        <div className="sm:hidden border-t border-border px-6 py-2">
          <DashboardNav isAdmin={isAdmin} />
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 md:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
