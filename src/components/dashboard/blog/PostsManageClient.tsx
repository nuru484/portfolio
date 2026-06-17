// src/components/dashboard/blog/PostsManageClient.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Eye, EyeOff, Star, Tags } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { ManageListSkeleton } from '@/components/dashboard/Skeletons';
import { ListFilters } from '@/components/dashboard/ListFilters';
import { ListPager } from '@/components/dashboard/ListPager';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { useGetAllCategoriesQuery } from '@/redux/category-api';
import {
  useGetAllPostsQuery,
  useTogglePostPublishMutation,
  useTogglePostFeaturedMutation,
  useDeletePostMutation,
} from '@/redux/post-api';
import type { IPostListItem } from '@/types/post.types';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Drafts' },
];

function PostRow({
  post,
  canDelete,
}: {
  post: IPostListItem;
  canDelete: boolean;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
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

  const handleDelete = async () => {
    await run(() => deletePost(post.id).unwrap(), 'Post removed.');
    setConfirmOpen(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 py-4 sm:px-5">
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
        {canDelete && (
          <button
            onClick={() => setConfirmOpen(true)}
            disabled={deleting}
            title="Remove"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-colors disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Remove post?"
        description={`This archives "${post.title}" (soft delete). It will no longer appear on your blog.`}
        confirmText="Remove"
        isDestructive
        loading={deleting}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export function PostsManageClient({
  canDelete = true,
}: {
  canDelete?: boolean;
}) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [categoryId, setCategoryId] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebouncedValue(search);

  const { data: categoriesRes } = useGetAllCategoriesQuery();
  const categories = categoriesRes?.data ?? [];

  const { data, isLoading, isError, isFetching } = useGetAllPostsQuery({
    search: debouncedSearch.trim() || undefined,
    isPublished: status === 'all' ? undefined : status === 'published',
    categoryId: categoryId || undefined,
    page,
    limit: 10,
  });
  const posts = data?.data ?? [];
  const pagination = data?.pagination;
  const filtering = !!debouncedSearch.trim() || status !== 'all' || !!categoryId;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
          <p className="mt-1 text-muted-foreground">Write and manage technical posts.</p>
        </div>
        <div className="flex gap-2 self-start">
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

      <ListFilters
        search={search}
        onSearch={(v) => {
          setSearch(v);
          setPage(1);
        }}
        status={status}
        onStatus={(v) => {
          setStatus(v);
          setPage(1);
        }}
        statusOptions={STATUS_OPTIONS}
        placeholder="Search posts…"
        extra={
          categories.length > 0 ? (
            <select
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value);
                setPage(1);
              }}
              aria-label="Filter by category"
              className="h-10 rounded-full border border-border bg-transparent px-4 text-sm"
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          ) : null
        }
      />

      {isLoading ? (
        <ManageListSkeleton />
      ) : isError ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-8 text-center text-sm text-destructive">
          Failed to load posts.
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center">
          <p className="text-muted-foreground">
            {filtering ? 'No posts match your filters.' : 'No posts yet.'}
          </p>
          {!filtering && (
            <Button asChild className="mt-4 gap-2">
              <Link href="/dashboard/blog/new">
                <Plus className="h-4 w-4" />
                Write your first post
              </Link>
            </Button>
          )}
        </div>
      ) : (
        <>
          <div
            className={`divide-y divide-border sm:overflow-hidden sm:rounded-2xl sm:border sm:border-border sm:bg-card ${
              isFetching ? 'opacity-60' : ''
            }`}
          >
            {posts.map((post) => (
              <PostRow key={post.id} post={post} canDelete={canDelete} />
            ))}
          </div>
          {pagination && (
            <ListPager
              page={pagination.page}
              totalPages={pagination.totalPages}
              total={pagination.total}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
}
