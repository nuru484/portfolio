// src/components/dashboard/MobileNav.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dialog } from 'radix-ui';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { dashboardLinks, isActiveLink } from './nav-links';

/** Mobile-only hamburger that opens a slide-in drawer of the dashboard tabs. */
export function MobileNav({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground hover:bg-muted transition-colors sm:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-4 w-4" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[1px] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 sm:hidden" />
        <Dialog.Content
          className={cn(
            'fixed inset-y-0 right-0 z-50 w-72 max-w-[80%] border-l border-border bg-background p-5 shadow-xl font-urbanist sm:hidden',
            'data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right',
          )}
        >
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold">Menu</Dialog.Title>
            <Dialog.Close
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground hover:bg-muted"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>

          <nav className="mt-6 flex flex-col gap-1">
            {dashboardLinks
              .filter((l) => !l.adminOnly || isAdmin)
              .map((link) => {
                const active = isActiveLink(link.href, pathname);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'inline-flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
