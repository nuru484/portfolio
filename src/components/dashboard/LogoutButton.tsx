// src/components/dashboard/LogoutButton.tsx
'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { logout } from '@/lib/auth';

export function LogoutButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
      router.push('/login');
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-50"
    >
      <LogOut className="h-4 w-4" />
      {pending ? 'Signing out…' : 'Sign out'}
    </button>
  );
}
