// src/app/dashboard/profile/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { requireSession } from '@/lib/session';
import prisma from '@/lib/prisma';
import { ProfileForm } from '@/components/dashboard/profile/ProfileForm';
import { PasswordForm } from '@/components/dashboard/profile/PasswordForm';
import { SecuritySection } from '@/components/dashboard/SecuritySection';

export const metadata: Metadata = { title: 'Profile' };

export default async function ProfilePage() {
  const { userId } = await requireSession();

  const user = await prisma.user.findFirst({
    where: { id: userId },
    select: {
      fullname: true,
      email: true,
      phone: true,
      isAdmin: true,
      twoFactorEnabled: true,
    },
  });

  if (!user) notFound();

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Profile</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your account details and security.
        </p>
      </div>

      <ProfileForm
        initial={{
          fullname: user.fullname,
          email: user.email,
          phone: user.phone,
        }}
      />

      <PasswordForm />

      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Account security
        </h2>
        <SecuritySection initialEnabled={user.twoFactorEnabled} />
      </section>
    </div>
  );
}
