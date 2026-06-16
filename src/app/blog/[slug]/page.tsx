// src/app/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Home, MoveRight, CalendarDays, Clock } from 'lucide-react';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { getPublishedPostBySlug } from '@/lib/posts/post-service';
import { SITE } from '@/config/constants';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(value: string | Date | null): string {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return { title: 'Post not found', robots: { index: false, follow: false } };
  }

  const url = `${SITE.url}/blog/${slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
      publishedTime: post.publishDate
        ? new Date(post.publishDate).toISOString()
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <NavBar />

      <article className="font-urbanist">
        <div className="max-w-3xl mx-auto px-6 md:px-12 pt-6 pb-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" aria-label="Home" className="hover:text-foreground transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <MoveRight strokeWidth={1} className="w-4 h-4" />
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
          </div>

          {post.category && (
            <Link
              href={`/blog?category=${post.category.slug}`}
              className="inline-block rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {post.category.name}
            </Link>
          )}

          <h1 className="mt-4 text-4xl md:text-5xl font-medium leading-tight tracking-normal">
            {post.title}
          </h1>

          <p className="mt-4 text-xl text-muted-foreground">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span>{post.author.fullname}</span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4" />
              {formatDate(post.publishDate ?? post.createdAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </div>

        {post.coverImage && (
          <div className="max-w-5xl mx-auto px-6 md:px-12 mb-10">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                sizes="(min-width: 1024px) 64rem, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Rendered HTML content */}
        <div
          className="
            message-content max-w-3xl mx-auto px-6 md:px-12 pb-16
            text-base leading-relaxed text-foreground break-words
            [&_p]:my-4 [&_p]:leading-7
            [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:tracking-tight
            [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3
            [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mt-6 [&_h4]:mb-2
            [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-muted-foreground
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ul]:space-y-1
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_ol]:space-y-1
            [&_li]:leading-7
            [&_blockquote]:border-l-4 [&_blockquote]:border-border [&_blockquote]:pl-4
            [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:my-6
            [&_:not(pre)>code]:bg-muted [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5
            [&_:not(pre)>code]:rounded [&_:not(pre)>code]:text-[0.9em] [&_:not(pre)>code]:font-mono
            [&_pre]:bg-zinc-950 [&_pre]:text-zinc-50 [&_pre]:rounded-xl [&_pre]:p-4
            [&_pre]:overflow-x-auto [&_pre]:my-6 [&_pre]:text-sm [&_pre]:leading-relaxed
            [&_pre]:border [&_pre]:border-zinc-800
            [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:font-mono
            [&_img]:rounded-xl [&_img]:my-6 [&_img]:max-w-full [&_img]:h-auto
            [&_table]:w-full [&_table]:my-6 [&_table]:text-sm [&_table]:border-collapse
            [&_th]:border [&_th]:border-border [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold
            [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2
            [&_hr]:my-8 [&_hr]:border-border
            [&_strong]:font-semibold
          "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <Footer />
    </>
  );
}
