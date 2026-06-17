// src/components/dashboard/profile/ProfileForm.tsx
'use client';

import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateProfile, type ProfileState } from '@/lib/account';

interface ProfileFormProps {
  initial: { fullname: string; email: string; phone: string | null };
  onDone?: () => void;
  onCancel?: () => void;
}

export function ProfileForm({ initial, onDone, onCancel }: ProfileFormProps) {
  const [state, action, pending] = useActionState<ProfileState, FormData>(
    updateProfile,
    { success: false },
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message ?? 'Profile updated.');
      onDone?.();
    } else if (state.errors?._form) {
      toast.error(state.errors._form[0]);
    }
  }, [state, onDone]);

  return (
    <form
      action={action}
      noValidate
      className="space-y-4 sm:rounded-2xl sm:border sm:border-border sm:bg-card sm:p-6"
    >
      <div>
        <h3 className="font-semibold">Edit profile</h3>
        <p className="text-sm text-muted-foreground">
          Update the name, email, and phone on your account.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="fullname">Full name</Label>
          <Input
            id="fullname"
            name="fullname"
            defaultValue={initial.fullname}
            aria-invalid={!!state.errors?.fullname}
          />
          {state.errors?.fullname && (
            <p className="text-xs text-destructive">{state.errors.fullname[0]}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={initial.email}
            aria-invalid={!!state.errors?.email}
          />
          {state.errors?.email && (
            <p className="text-xs text-destructive">{state.errors.email[0]}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            name="phone"
            defaultValue={initial.phone ?? ''}
            aria-invalid={!!state.errors?.phone}
          />
          {state.errors?.phone && (
            <p className="text-xs text-destructive">{state.errors.phone[0]}</p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={pending} className="gap-2">
          <Save className="h-4 w-4" />
          {pending ? 'Saving…' : 'Save changes'}
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
