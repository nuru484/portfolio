// src/app/dashboard/users/page.tsx
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { requireSession } from '@/lib/session';
import { listUsers } from '@/lib/users';
import { UserCreateForm } from '@/components/dashboard/users/UserCreateForm';
import { UsersList } from '@/components/dashboard/users/UsersList';

export const metadata: Metadata = { title: 'Users' };

export default async function UsersPage() {
  const { userId, isAdmin } = await requireSession();
  if (!isAdmin) redirect('/dashboard');

  const users = await listUsers();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Users</h1>
        <p className="mt-1 text-muted-foreground">
          Create and manage admin-portal accounts. There is no public sign-up.
        </p>
      </div>

      <UserCreateForm />

      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          All users ({users.length})
        </h2>
        <UsersList users={users} currentUserId={userId} />
      </section>
    </div>
  );
}
