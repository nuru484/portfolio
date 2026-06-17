// src/app/dashboard/layout.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { requireSession } from '@/lib/session';
import { DashboardNav } from '@/components/dashboard/DashboardNav';
import { MobileNav } from '@/components/dashboard/MobileNav';
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
              Nurudeen&apos;s Portfolio
            </Link>
            <div className="hidden sm:block">
              <DashboardNav isAdmin={isAdmin} />
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle className="w-8 h-8 md:w-9 md:h-9 border border-border text-foreground hover:bg-muted" />
            <LogoutButton />
            <MobileNav isAdmin={isAdmin} />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 md:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
