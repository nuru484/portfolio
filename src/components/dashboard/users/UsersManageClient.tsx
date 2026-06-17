// src/components/dashboard/users/UsersManageClient.tsx
'use client';

import { useMemo, useState } from 'react';
import { Plus, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserCreateForm } from './UserCreateForm';
import { UsersList } from './UsersList';
import type { IUser } from '@/types/user.types';

export function UsersManageClient({
  users,
  currentUserId,
}: {
  users: IUser[];
  currentUserId: string;
}) {
  const [showCreate, setShowCreate] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.fullname.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q),
    );
  }, [users, query]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Users</h1>
          <p className="mt-1 text-muted-foreground">
            Create and manage admin-portal accounts. There is no public sign-up.
          </p>
        </div>
        <Button onClick={() => setShowCreate((s) => !s)} className="gap-2 shrink-0">
          {showCreate ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showCreate ? 'Close' : 'Create user'}
        </Button>
      </div>

      {showCreate && (
        <UserCreateForm
          onSuccess={() => setShowCreate(false)}
          onCancel={() => setShowCreate(false)}
        />
      )}

      <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2.5 max-w-sm focus-within:border-foreground transition-colors">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email…"
          aria-label="Search users"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {query ? `${filtered.length} of ${users.length}` : `All users (${users.length})`}
        </h2>
        {filtered.length === 0 && query ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            No users match “{query}”.
          </div>
        ) : (
          <UsersList users={filtered} currentUserId={currentUserId} />
        )}
      </section>
    </div>
  );
}
