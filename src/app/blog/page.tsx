// src/app/blog/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { BlogCard } from '@/components/blog/BlogCard';
import { getPublishedPosts } from '@/lib/posts/post-service';
import { listCategories } from '@/lib/posts/category-service';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Technical writing by Abdul-Majeed Nurudeen — notes on full-stack development, the PERN stack, and building for the web.',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const [{ data: posts }, categories] = await Promise.all([
    getPublishedPosts({ categorySlug: category, limit: 60 }),
    listCategories(),
  ]);

  return (
    <>
      <NavBar />
      <main className="max-w-6xl mx-auto px-6 md:px-12 py-8 font-urbanist min-h-[60vh]">
        <header className="mb-10">
          <h1 className="text-5xl lg:text-7xl font-medium leading-tight tracking-normal">
            Writing
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl">
            Technical notes on full-stack development, the PERN stack, and
            building things for the web.
          </p>
        </header>

        {categories.length > 0 && (
          <nav className="flex flex-wrap gap-2 mb-10">
            <Link
              href="/blog"
              className={cn(
                'px-4 py-2 rounded-full border text-sm font-medium transition-colors',
                !category
                  ? 'bg-foreground text-background border-foreground'
                  : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted',
              )}
            >
              All
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/blog?category=${c.slug}`}
                className={cn(
                  'px-4 py-2 rounded-full border text-sm font-medium transition-colors',
                  category === c.slug
                    ? 'bg-foreground text-background border-foreground'
                    : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted',
                )}
              >
                {c.name}
              </Link>
            ))}
          </nav>
        )}

        {posts.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            {category ? 'No posts in this category yet.' : 'No posts yet — check back soon.'}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
