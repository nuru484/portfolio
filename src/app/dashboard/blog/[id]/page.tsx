// src/app/dashboard/blog/[id]/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Pencil, ExternalLink } from 'lucide-react';
import { requireSession } from '@/lib/session';
import { getPostById } from '@/lib/posts/post-service';
import { Button } from '@/components/ui/button';
import { FormPageHeader } from '@/components/dashboard/FormPageHeader';

export const metadata: Metadata = { title: 'Post' };

function formatDate(value: string | Date | null) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSession();
  const { id } = await params;

  const post = await getPostById(id).catch(() => null);
  if (!post) notFound();

  return (
    <div className="space-y-6 max-w-3xl">
      <FormPageHeader title={post.title} backHref="/dashboard/blog" />

      <div className="flex flex-wrap items-center gap-3">
        <span
          className={
            post.isPublished
              ? 'rounded-full bg-foreground px-2.5 py-1 text-xs font-medium text-background'
              : 'rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground'
          }
        >
          {post.isPublished ? 'Published' : 'Draft'}
        </span>
        {post.isFeatured && (
          <span className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
            Featured
          </span>
        )}
        <span className="text-sm text-muted-foreground">
          {post.category?.name ?? 'Uncategorized'} · {post.readTime}
        </span>
        <div className="ml-auto flex gap-2">
          {post.isPublished && (
            <Button asChild variant="outline" size="sm" className="gap-2">
              <Link href={`/blog/${post.slug}`} target="_blank">
                <ExternalLink className="h-4 w-4" /> View live
              </Link>
            </Button>
          )}
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link href={`/dashboard/blog/${post.id}/edit`}>
              <Pencil className="h-4 w-4" /> Edit
            </Link>
          </Button>
        </div>
      </div>

      {post.coverImage && (
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-muted">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(min-width: 768px) 48rem, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <p className="text-lg leading-relaxed text-muted-foreground">
        {post.excerpt}
      </p>

      <p className="text-xs text-muted-foreground">
        By {post.author.fullname} · {formatDate(post.publishDate ?? post.createdAt)}
      </p>

      <div
        className="
          max-w-none border-t border-border pt-6 text-base leading-relaxed text-foreground break-words
          [&_p]:my-4 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold
          [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold
          [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6
          [&_a]:underline [&_a]:underline-offset-2
          [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-zinc-950 [&_pre]:p-4 [&_pre]:text-sm [&_pre]:text-zinc-50
          [&_img]:my-6 [&_img]:rounded-xl
        "
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
