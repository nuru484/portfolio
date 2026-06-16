// src/components/dashboard/SecuritySection.tsx
'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { ShieldCheck, ShieldOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  requestTwoFactorSetup,
  confirmTwoFactorSetup,
  disableTwoFactor,
} from '@/lib/auth';

export function SecuritySection({ initialEnabled }: { initialEnabled: boolean }) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [setupPending, setSetupPending] = useState(false);
  const [code, setCode] = useState('');
  const [busy, startTransition] = useTransition();

  const handleEnable = () =>
    startTransition(async () => {
      const r = await requestTwoFactorSetup();
      if (r.success) {
        setSetupPending(true);
        toast.success(r.message ?? 'We sent a code to your email.');
      } else {
        toast.error(r.error ?? 'Could not start setup.');
      }
    });

  const handleConfirm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const formData = new FormData();
      formData.set('code', code);
      const r = await confirmTwoFactorSetup({ success: false }, formData);
      if (r.success && r.enabled) {
        setEnabled(true);
        setSetupPending(false);
        setCode('');
        toast.success(r.message ?? 'Two-factor authentication enabled.');
      } else {
        toast.error(r.error ?? 'Invalid code.');
      }
    });
  };

  const handleDisable = () =>
    startTransition(async () => {
      const r = await disableTwoFactor();
      if (r.success) {
        setEnabled(false);
        setSetupPending(false);
        toast.success(r.message ?? 'Two-factor authentication disabled.');
      } else {
        toast.error(r.error ?? 'Could not disable.');
      }
    });

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border">
            {enabled ? (
              <ShieldCheck className="h-5 w-5" />
            ) : (
              <ShieldOff className="h-5 w-5 text-muted-foreground" />
            )}
          </span>
          <div>
            <h3 className="font-semibold">Two-factor authentication</h3>
            <p className="text-sm text-muted-foreground">
              {enabled
                ? 'Enabled — a one-time code is emailed at each sign-in.'
                : 'Add an extra step at sign-in with an emailed one-time code.'}
            </p>
          </div>
        </div>
        <span
          className={
            enabled
              ? 'shrink-0 rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background'
              : 'shrink-0 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground'
          }
        >
          {enabled ? 'On' : 'Off'}
        </span>
      </div>

      <div className="mt-5">
        {enabled ? (
          <Button variant="outline" onClick={handleDisable} disabled={busy}>
            {busy ? 'Disabling…' : 'Disable 2FA'}
          </Button>
        ) : setupPending ? (
          <form onSubmit={handleConfirm} className="space-y-3 max-w-xs">
            <div className="space-y-1.5">
              <Label htmlFor="code">Enter the code we emailed you</Label>
              <Input
                id="code"
                name="code"
                inputMode="numeric"
                maxLength={6}
                placeholder="123456"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="text-center tracking-[0.4em]"
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={busy}>
                {busy ? 'Confirming…' : 'Confirm & enable'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setSetupPending(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <Button onClick={handleEnable} disabled={busy}>
            {busy ? 'Sending code…' : 'Enable 2FA'}
          </Button>
        )}
      </div>
    </div>
  );
}
