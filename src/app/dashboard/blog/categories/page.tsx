// src/app/dashboard/blog/categories/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { requireSession } from '@/lib/session';
import { CategoriesManageClient } from '@/components/dashboard/blog/CategoriesManageClient';

export const metadata: Metadata = { title: 'Categories' };

export default async function CategoriesPage() {
  const { isAdmin } = await requireSession();
  if (!isAdmin) redirect('/dashboard');

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/blog"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to blog
      </Link>
      <CategoriesManageClient />
    </div>
  );
}
