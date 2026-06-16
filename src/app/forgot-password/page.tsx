// src/app/forgot-password/page.tsx
import type { Metadata } from 'next';
import { AuthShell } from '@/components/auth/AuthShell';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Forgot password',
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Forgot password"
      subtitle="We'll email you a link to reset it"
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
