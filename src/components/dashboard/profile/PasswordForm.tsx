// src/components/dashboard/profile/PasswordForm.tsx
'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Lock, Save, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { changePassword, type PasswordState } from '@/lib/account';

function PasswordInput({
  id,
  name,
  label,
  error,
}: {
  id: string;
  name: string;
  label: string;
  error?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={show ? 'text' : 'password'}
          aria-invalid={!!error}
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export function PasswordForm({
  onDone,
  onCancel,
}: {
  onDone?: () => void;
  onCancel?: () => void;
} = {}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState<PasswordState, FormData>(
    changePassword,
    { success: false },
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message ?? 'Password updated.');
      formRef.current?.reset();
      onDone?.();
    } else if (state.errors?._form) {
      toast.error(state.errors._form[0]);
    }
  }, [state, onDone]);

  return (
    <form
      ref={formRef}
      action={action}
      noValidate
      className="space-y-4 sm:rounded-2xl sm:border sm:border-border sm:bg-card sm:p-6"
    >
      <div className="flex items-center gap-2">
        <Lock className="h-4 w-4" />
        <h3 className="font-semibold">Change password</h3>
      </div>

      <div className="grid gap-4 max-w-md">
        <PasswordInput
          id="currentPassword"
          name="currentPassword"
          label="Current password"
          error={state.errors?.currentPassword?.[0]}
        />
        <PasswordInput
          id="newPassword"
          name="newPassword"
          label="New password"
          error={state.errors?.newPassword?.[0]}
        />
        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm new password"
          error={state.errors?.confirmPassword?.[0]}
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={pending} className="gap-2">
          <Save className="h-4 w-4" />
          {pending ? 'Updating…' : 'Update password'}
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
