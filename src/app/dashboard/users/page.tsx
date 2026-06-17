// src/app/dashboard/users/page.tsx
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { requireSession } from '@/lib/session';
import { listUsers } from '@/lib/users';
import { UsersManageClient } from '@/components/dashboard/users/UsersManageClient';

export const metadata: Metadata = { title: 'Users' };

export default async function UsersPage() {
  const { userId, isAdmin } = await requireSession();
  if (!isAdmin) redirect('/dashboard');

  const users = await listUsers();

  return <UsersManageClient users={users} currentUserId={userId} />;
}
