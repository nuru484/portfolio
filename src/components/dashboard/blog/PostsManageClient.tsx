// src/components/dashboard/blog/PostsManageClient.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Eye, EyeOff, Star, Tags } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  useGetAllPostsQuery,
  useTogglePostPublishMutation,
  useTogglePostFeaturedMutation,
  useDeletePostMutation,
} from '@/redux/post-api';
import type { IPostListItem } from '@/types/post.types';

function PostRow({ post }: { post: IPostListItem }) {
  const [togglePublish, { isLoading: publishing }] = useTogglePostPublishMutation();
  const [toggleFeatured, { isLoading: featuring }] = useTogglePostFeaturedMutation();
  const [deletePost, { isLoading: deleting }] = useDeletePostMutation();

  const run = async (fn: () => Promise<unknown>, ok: string) => {
    try {
      await fn();
      toast.success(ok);
    } catch {
      toast.error('Action failed.');
    }
  };

  const handleDelete = () => {
    if (!confirm(`Remove "${post.title}"? This archives it (soft delete).`)) return;
    run(() => deletePost(post.id).unwrap(), 'Post removed.');
  };

  return (
    <div className="flex flex-wrap items-center gap-4 px-5 py-4">
      <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
        {post.coverImage && (
          <Image src={post.coverImage} alt="" fill className="object-cover" sizes="80px" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-medium truncate">{post.title}</p>
        <p className="text-xs text-muted-foreground truncate">
          {post.category?.name ?? 'Uncategorized'} · {post.readTime}
        </p>
      </div>

      {post.isFeatured && (
        <span className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
          Featured
        </span>
      )}
      <span
        className={
          post.isPublished
            ? 'rounded-full bg-foreground px-2.5 py-1 text-xs font-medium text-background'
            : 'rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground'
        }
      >
        {post.isPublished ? 'Published' : 'Draft'}
      </span>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => run(() => toggleFeatured(post.id).unwrap(), 'Updated.')}
          disabled={featuring}
          title={post.isFeatured ? 'Unfeature' : 'Feature'}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50"
        >
          <Star className={`h-4 w-4 ${post.isFeatured ? 'fill-current' : ''}`} />
        </button>
        <button
          onClick={() => run(() => togglePublish(post.id).unwrap(), post.isPublished ? 'Unpublished.' : 'Published.')}
          disabled={publishing}
          title={post.isPublished ? 'Unpublish' : 'Publish'}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50"
        >
          {post.isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
        <Link
          href={`/dashboard/blog/${post.id}/edit`}
          title="Edit"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <Pencil className="h-4 w-4" />
        </Link>
        <button
          onClick={handleDelete}
          disabled={deleting}
          title="Remove"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-colors disabled:opacity-50"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function PostsManageClient() {
  const { data, isLoading, isError } = useGetAllPostsQuery();
  const posts = data?.data ?? [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
          <p className="mt-1 text-muted-foreground">Write and manage technical posts.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/dashboard/blog/categories">
              <Tags className="h-4 w-4" />
              Categories
            </Link>
          </Button>
          <Button asChild className="gap-2">
            <Link href="/dashboard/blog/new">
              <Plus className="h-4 w-4" />
              New post
            </Link>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
          Loading…
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-8 text-center text-sm text-destructive">
          Failed to load posts.
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center">
          <p className="text-muted-foreground">No posts yet.</p>
          <Button asChild className="mt-4 gap-2">
            <Link href="/dashboard/blog/new">
              <Plus className="h-4 w-4" />
              Write your first post
            </Link>
          </Button>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card overflow-hidden divide-y divide-border">
          {posts.map((post) => (
            <PostRow key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
