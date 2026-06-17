// src/components/dashboard/users/UsersList.tsx
import type { IUser } from '@/types/user.types';
import { DeleteUserButton } from './DeleteUserButton';

export function UsersList({
  users,
  currentUserId,
}: {
  users: IUser[];
  currentUserId: string;
}) {
  if (users.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
        No users yet.
      </div>
    );
  }

  return (
    <div className="sm:overflow-hidden sm:rounded-2xl sm:border sm:border-border sm:bg-card">
      <div className="divide-y divide-border">
        {users.map((u) => (
          <div
            key={u.id}
            className="flex flex-wrap items-center justify-between gap-3 py-4 sm:px-5"
          >
            <div className="min-w-0">
              <p className="font-medium truncate">
                {u.fullname}
                {u.id === currentUserId && (
                  <span className="ml-2 text-xs text-muted-foreground">(You)</span>
                )}
              </p>
              <p className="text-sm text-muted-foreground truncate">{u.email}</p>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={
                  u.isAdmin
                    ? 'rounded-full bg-foreground px-2.5 py-1 text-xs font-medium text-background'
                    : 'rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground'
                }
              >
                {u.isAdmin ? 'Admin' : 'Member'}
              </span>
              {u.twoFactorEnabled && (
                <span className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  2FA
                </span>
              )}
              {u.id !== currentUserId ? (
                <DeleteUserButton id={u.id} name={u.fullname} />
              ) : (
                <span className="px-3 text-xs text-muted-foreground">—</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
