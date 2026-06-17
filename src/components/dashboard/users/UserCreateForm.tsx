// src/components/dashboard/users/UserCreateForm.tsx
'use client';

import { useActionState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createUser, type CreateUserState } from '@/lib/users';

export function UserCreateForm({
  onSuccess,
  onCancel,
}: {
  onSuccess?: () => void;
  onCancel?: () => void;
} = {}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState<CreateUserState, FormData>(
    createUser,
    { success: false },
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message ?? 'User created.');
      formRef.current?.reset();
      onSuccess?.();
    } else if (state.errors?._form) {
      toast.error(state.errors._form[0]);
    }
  }, [state, onSuccess]);

  return (
    <form
      ref={formRef}
      action={action}
      noValidate
      className="space-y-4 sm:rounded-2xl sm:border sm:border-border sm:bg-card sm:p-6"
    >
      <div className="flex items-center gap-2">
        <UserPlus className="h-4 w-4" />
        <h3 className="font-semibold">Add a user</h3>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="fullname">Full name</Label>
          <Input id="fullname" name="fullname" aria-invalid={!!state.errors?.fullname} />
          {state.errors?.fullname && (
            <p className="text-xs text-destructive">{state.errors.fullname[0]}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="new-email">Email</Label>
          <Input
            id="new-email"
            name="email"
            type="email"
            aria-invalid={!!state.errors?.email}
          />
          {state.errors?.email && (
            <p className="text-xs text-destructive">{state.errors.email[0]}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input id="phone" name="phone" aria-invalid={!!state.errors?.phone} />
          {state.errors?.phone && (
            <p className="text-xs text-destructive">{state.errors.phone[0]}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="new-password">Temporary password</Label>
          <Input
            id="new-password"
            name="password"
            type="password"
            aria-invalid={!!state.errors?.password}
          />
          {state.errors?.password && (
            <p className="text-xs text-destructive">{state.errors.password[0]}</p>
          )}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        <input
          type="checkbox"
          name="isAdmin"
          className="h-4 w-4 rounded border-border accent-foreground"
        />
        Grant administrator access
      </label>

      <div className="flex gap-3">
        <Button type="submit" disabled={pending} className="gap-2">
          <UserPlus className="h-4 w-4" />
          {pending ? 'Creating…' : 'Create user'}
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
