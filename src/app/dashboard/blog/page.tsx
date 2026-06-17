// src/app/dashboard/blog/page.tsx
import type { Metadata } from 'next';
import { requireSession } from '@/lib/session';
import { PostsManageClient } from '@/components/dashboard/blog/PostsManageClient';

export const metadata: Metadata = { title: 'Blog' };

export default async function BlogDashboardPage() {
  const { isAdmin } = await requireSession();
  return <PostsManageClient canDelete={isAdmin} />;
}
