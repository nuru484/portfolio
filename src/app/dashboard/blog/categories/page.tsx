// src/app/dashboard/blog/categories/page.tsx
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { requireSession } from '@/lib/session';
import { CategoriesManageClient } from '@/components/dashboard/blog/CategoriesManageClient';

export const metadata: Metadata = { title: 'Categories' };

export default async function CategoriesPage() {
  const { isAdmin } = await requireSession();
  if (!isAdmin) redirect('/dashboard');

  return (
    <div className="space-y-6">
      <CategoriesManageClient backHref="/dashboard/blog" backLabel="Back to blog" />
    </div>
  );
}
