// src/components/dashboard/profile/PasswordSection.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PasswordForm } from './PasswordForm';

export function PasswordSection() {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <PasswordForm
        onDone={() => setEditing(false)}
        onCancel={() => setEditing(false)}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="font-semibold">Password</h3>
        <p className="text-sm text-muted-foreground">
          Set a new password for your account.
        </p>
      </div>
      <Button
        variant="outline"
        onClick={() => setEditing(true)}
        className="self-start"
      >
        Edit password
      </Button>
    </div>
  );
}
