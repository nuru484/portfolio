// src/app/dashboard/page.tsx
import { notFound } from 'next/navigation';
import { requireSession } from '@/lib/session';
import prisma from '@/lib/prisma';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';

export default async function DashboardPage() {
  const { userId } = await requireSession();

  const user = await prisma.user.findFirst({
    where: { id: userId },
    select: { fullname: true },
  });

  if (!user) notFound();

  return <DashboardOverview firstName={user.fullname.split(' ')[0]} />;
}
