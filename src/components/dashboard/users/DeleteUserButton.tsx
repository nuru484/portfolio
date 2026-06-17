// src/components/dashboard/users/DeleteUserButton.tsx
'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import { softDeleteUser, type DeleteUserState } from '@/lib/users';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

export function DeleteUserButton({ id, name }: { id: string; name: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState<DeleteUserState, FormData>(
    softDeleteUser,
    { success: false },
  );

  useEffect(() => {
    // On success the server action revalidates the list and this row unmounts,
    // which also closes the dialog — so we only surface the toast here.
    if (state.success) toast.success(state.message ?? 'User removed.');
    else if (state.error) toast.error(state.error);
  }, [state]);

  return (
    <>
      <form ref={formRef} action={action}>
        <input type="hidden" name="id" value={id} />
        <button
          type="button"
          onClick={() => setOpen(true)}
          disabled={pending}
          aria-label={`Remove ${name}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-colors disabled:opacity-50"
        >
          <Trash2 className="h-3.5 w-3.5" />
          {pending ? 'Removing…' : 'Remove'}
        </button>
      </form>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Remove user?"
        description={`This archives ${name}'s account (soft delete). They lose access immediately.`}
        confirmText="Remove user"
        isDestructive
        requireExactMatch={name}
        loading={pending}
        onConfirm={() => formRef.current?.requestSubmit()}
      />
    </>
  );
}
