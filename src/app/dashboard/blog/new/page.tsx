// src/app/dashboard/blog/new/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { requireSession } from '@/lib/session';
import { PostForm } from '@/components/dashboard/blog/PostForm';

export const metadata: Metadata = { title: 'New post' };

export default async function NewPostPage() {
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
      <h1 className="text-3xl font-semibold tracking-tight">New post</h1>
      <PostForm mode="create" />
    </div>
  );
}
