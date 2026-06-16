// src/app/login/page.tsx
import type { Metadata } from 'next';
import { AuthShell } from '@/components/auth/AuthShell';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Sign in',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <AuthShell title="Sign in" subtitle="Admin portal — sign in to continue">
      <LoginForm />
    </AuthShell>
  );
}
