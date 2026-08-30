// src/app/dashboard/clients/[id]/edit/page.tsx
import type { Metadata } from 'next';
import { requireSession } from '@/lib/session';
import { EditClientLogoClient } from '@/components/dashboard/clients/EditClientLogoClient';
import { FormPageHeader } from '@/components/dashboard/FormPageHeader';

export const metadata: Metadata = { title: 'Edit client' };

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSession();
  const { id } = await params;

  return (
    <div className="space-y-6 max-w-2xl">
      <FormPageHeader
        title="Edit client"
        backHref="/dashboard/clients"
        backLabel="Back to clients"
      />
      <EditClientLogoClient id={id} />
    </div>
  );
}
