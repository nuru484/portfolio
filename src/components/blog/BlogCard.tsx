// src/components/blog/BlogCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { IPostListItem } from '@/types/post.types';

function formatDate(value: string | Date | null): string {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function BlogCard({ post }: { post: IPostListItem }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-colors hover:border-foreground/30"
    >
      <div className="relative aspect-[16/9] bg-muted overflow-hidden">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm">
            {post.category?.name ?? 'Article'}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          {post.category && (
            <span className="rounded-full border border-border px-2.5 py-0.5 font-medium">
              {post.category.name}
            </span>
          )}
          <span>{post.readTime}</span>
        </div>

        <h2 className="text-xl font-semibold leading-snug group-hover:text-muted-foreground transition-colors">
          {post.title}
        </h2>

        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
          {post.excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {formatDate(post.publishDate ?? post.createdAt)}
          </span>
          <span className="inline-flex items-center gap-1 font-medium group-hover:gap-2 transition-all">
            Read <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
