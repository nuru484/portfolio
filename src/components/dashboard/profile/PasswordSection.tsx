// src/components/dashboard/profile/PasswordSection.tsx
'use client';

import { useState } from 'react';
import { Lock } from 'lucide-react';
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
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border">
          <Lock className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-semibold">Password</h3>
          <p className="text-sm text-muted-foreground">
            Set a new password for your account.
          </p>
        </div>
      </div>
      <Button
        variant="outline"
        onClick={() => setEditing(true)}
        className="shrink-0"
      >
        Edit password
      </Button>
    </div>
  );
}
