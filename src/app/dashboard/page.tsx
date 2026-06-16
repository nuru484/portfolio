// src/app/dashboard/page.tsx
import { notFound } from 'next/navigation';
import { requireSession } from '@/lib/session';
import prisma from '@/lib/prisma';
import { SecuritySection } from '@/components/dashboard/SecuritySection';

export default async function DashboardPage() {
  const { userId } = await requireSession();

  const user = await prisma.user.findFirst({
    where: { id: userId },
    select: {
      fullname: true,
      email: true,
      isAdmin: true,
      twoFactorEnabled: true,
    },
  });

  if (!user) notFound();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome back, {user.fullname.split(' ')[0]}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {user.email} · {user.isAdmin ? 'Administrator' : 'Member'}
        </p>
      </div>

      <section className="max-w-2xl">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Account security
        </h2>
        <SecuritySection initialEnabled={user.twoFactorEnabled} />
      </section>
    </div>
  );
}
