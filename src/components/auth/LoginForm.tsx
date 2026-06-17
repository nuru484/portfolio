// src/components/auth/LoginForm.tsx
'use client';

import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signin, type SigninState } from '@/lib/auth';
import { TwoFactorLoginStep } from './TwoFactorLoginStep';

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [state, action, pending] = useActionState<SigninState, FormData>(signin, {
    success: false,
  });

  useEffect(() => {
    if (state.success && state.redirectTo) {
      toast.success('Signed in successfully');
      router.push(state.redirectTo);
    } else if (!state.success && state.errors) {
      const firstError =
        state.errors._form?.[0] ??
        state.errors.email?.[0] ??
        state.errors.password?.[0];
      if (firstError) toast.error(firstError);
    }
  }, [state, router]);

  if (state.requiresTwoFactor) {
    return <TwoFactorLoginStep maskedEmail={state.maskedEmail} />;
  }

  return (
    <form action={action} noValidate className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={!!state.errors?.email}
        />
        {state.errors?.email && (
          <p className="text-xs text-destructive">{state.errors.email[0]}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            autoComplete="current-password"
            aria-invalid={!!state.errors?.password}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {state.errors?.password && (
          <p className="text-xs text-destructive">{state.errors.password[0]}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
        >
          Forgot password?
        </Link>
      </div>

      {state.errors?._form && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3">
          <p className="text-xs text-destructive">{state.errors._form[0]}</p>
        </div>
      )}

      <Button type="submit" disabled={pending} className="w-full gap-2">
        {pending ? 'Signing in…' : 'Sign in'}
        {!pending && <ArrowRight className="h-4 w-4" />}
      </Button>
    </form>
  );
}
