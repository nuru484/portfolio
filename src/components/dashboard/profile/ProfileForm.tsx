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
}

export function ProfileForm({ initial }: ProfileFormProps) {
  const [state, action, pending] = useActionState<ProfileState, FormData>(
    updateProfile,
    { success: false },
  );

  useEffect(() => {
    if (state.success) toast.success(state.message ?? 'Profile updated.');
    else if (state.errors?._form) toast.error(state.errors._form[0]);
  }, [state]);

  return (
    <form
      action={action}
      className="rounded-2xl border border-border bg-card p-6 space-y-4"
    >
      <div>
        <h3 className="font-semibold">Profile details</h3>
        <p className="text-sm text-muted-foreground">
          Update the name, email, and phone on your account.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="fullname">Full name</Label>
          <Input id="fullname" name="fullname" defaultValue={initial.fullname} required />
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
            required
          />
          {state.errors?.email && (
            <p className="text-xs text-destructive">{state.errors.email[0]}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input id="phone" name="phone" defaultValue={initial.phone ?? ''} />
          {state.errors?.phone && (
            <p className="text-xs text-destructive">{state.errors.phone[0]}</p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={pending} className="gap-2">
        <Save className="h-4 w-4" />
        {pending ? 'Saving…' : 'Save changes'}
      </Button>
    </form>
  );
}
