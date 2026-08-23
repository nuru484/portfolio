// src/app/dashboard/clients/new/page.tsx
import type { Metadata } from 'next';
import { requireSession } from '@/lib/session';
import { ClientLogoForm } from '@/components/dashboard/clients/ClientLogoForm';
import { FormPageHeader } from '@/components/dashboard/FormPageHeader';

export const metadata: Metadata = { title: 'New client' };

export default async function NewClientPage() {
  await requireSession();

  return (
    <div className="space-y-6 max-w-2xl">
      <FormPageHeader title="New client" backHref="/dashboard/clients" />
      <ClientLogoForm mode="create" />
    </div>
  );
}
