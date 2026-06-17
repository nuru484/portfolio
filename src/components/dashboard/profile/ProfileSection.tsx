// src/components/dashboard/profile/ProfileSection.tsx
'use client';

import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProfileForm } from './ProfileForm';

interface Details {
  fullname: string;
  email: string;
  phone: string | null;
}

export function ProfileSection({ initial }: { initial: Details }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <ProfileForm
        initial={initial}
        onDone={() => setEditing(false)}
        onCancel={() => setEditing(false)}
      />
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-semibold">Profile details</h3>
          <p className="text-sm text-muted-foreground">
            Your account name, email, and phone.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setEditing(true)}
          className="gap-2 self-start"
        >
          <Pencil className="h-4 w-4" />
          Edit profile
        </Button>
      </div>

      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted-foreground">
            Full name
          </dt>
          <dd className="mt-1 font-medium">{initial.fullname}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted-foreground">
            Email
          </dt>
          <dd className="mt-1 font-medium break-all">{initial.email}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted-foreground">
            Phone
          </dt>
          <dd className="mt-1 font-medium">{initial.phone || '—'}</dd>
        </div>
      </dl>
    </div>
  );
}
