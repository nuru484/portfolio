// src/components/dashboard/users/DeleteUserButton.tsx
'use client';

import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import { softDeleteUser, type DeleteUserState } from '@/lib/users';

export function DeleteUserButton({ id, name }: { id: string; name: string }) {
  const [state, action, pending] = useActionState<DeleteUserState, FormData>(
    softDeleteUser,
    { success: false },
  );

  useEffect(() => {
    if (state.success) toast.success(state.message ?? 'User removed.');
    else if (state.error) toast.error(state.error);
  }, [state]);

  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`Remove ${name}? This archives the account (soft delete).`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        disabled={pending}
        aria-label={`Remove ${name}`}
        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-colors disabled:opacity-50"
      >
        <Trash2 className="h-3.5 w-3.5" />
        {pending ? 'Removing…' : 'Remove'}
      </button>
    </form>
  );
}
