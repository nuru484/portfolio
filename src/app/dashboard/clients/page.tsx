// src/app/dashboard/clients/page.tsx
import type { Metadata } from 'next';
import { requireSession } from '@/lib/session';
import { ClientLogosManageClient } from '@/components/dashboard/clients/ClientLogosManageClient';

export const metadata: Metadata = { title: 'Clients' };

export default async function ClientsPage() {
  const { isAdmin } = await requireSession();
  return <ClientLogosManageClient canDelete={isAdmin} />;
}
