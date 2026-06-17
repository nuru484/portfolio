// src/app/dashboard/blog/new/page.tsx
import type { Metadata } from 'next';
import { requireSession } from '@/lib/session';
import { PostForm } from '@/components/dashboard/blog/PostForm';
import { FormPageHeader } from '@/components/dashboard/FormPageHeader';

export const metadata: Metadata = { title: 'New post' };

export default async function NewPostPage() {
  await requireSession();

  return (
    <div className="space-y-6">
      <FormPageHeader title="New post" backHref="/dashboard/blog" />
      <PostForm mode="create" />
    </div>
  );
}
