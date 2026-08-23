// src/components/dashboard/clients/EditClientLogoClient.tsx
'use client';

import { useGetClientLogoQuery } from '@/redux/client-logo-api';
import { ClientLogoForm } from './ClientLogoForm';
import {
  FormSkeleton,
  type FormFieldShape,
} from '@/components/dashboard/FormSkeleton';

/** Mirrors the field order the form renders. */
const FORM_SHAPE: FormFieldShape[] = ['input', 'image', 'input', 'settings'];

export function EditClientLogoClient({ id }: { id: string }) {
  const { data, isLoading, isError } = useGetClientLogoQuery(id);

  if (isLoading) return <FormSkeleton fields={FORM_SHAPE} />;
  if (isError || !data) {
    return (
      <p className="text-sm text-destructive">Failed to load client logo.</p>
    );
  }

  return <ClientLogoForm mode="edit" initial={data.data} />;
}
