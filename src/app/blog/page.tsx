// src/app/blog/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { BlogCard } from '@/components/blog/BlogCard';
import { Pagination } from '@/components/Pagination';
import { getPublishedPosts } from '@/lib/posts/post-service';
import { listCategories } from '@/lib/posts/category-service';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Technical writing by Abdul-Majeed Nurudeen — notes on full-stack development, the PERN stack, and building for the web.',
};

const PAGE_SIZE = 9;

/** Builds a /blog href from the given params, dropping empty ones. */
function blogHref(params: { category?: string; q?: string; page?: number }) {
  const sp = new URLSearchParams();
  if (params.category) sp.set('category', params.category);
  if (params.q) sp.set('q', params.q);
  if (params.page && params.page > 1) sp.set('page', String(params.page));
  const qs = sp.toString();
  return qs ? `/blog?${qs}` : '/blog';
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string; page?: string }>;
}) {
  const { category, q, page } = await searchParams;
  const currentPage = Math.max(Number(page) || 1, 1);
  const search = q?.trim() || undefined;

  const [{ data: posts, pagination }, categories] = await Promise.all([
    getPublishedPosts({
      categorySlug: category,
      search,
      page: currentPage,
      limit: PAGE_SIZE,
    }),
    listCategories(),
  ]);

  return (
    <>
      <NavBar />
      <main className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20 font-urbanist min-h-[60vh]">
        <header className="mb-12 md:mb-16">
          <h1 className="text-5xl lg:text-7xl font-medium leading-tight tracking-normal">
            Writing
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Technical notes on full-stack development, the PERN stack, and
            building things for the web.
          </p>
        </header>

        {/* Search — GET form so it stays server-side and shareable. */}
        <form action="/blog" method="get" className="mb-6 max-w-md">
          {category && <input type="hidden" name="category" value={category} />}
          <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2.5 focus-within:border-foreground transition-colors">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              type="search"
              name="q"
              defaultValue={search ?? ''}
              placeholder="Search posts…"
              aria-label="Search posts"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </form>

        {categories.length > 0 && (
          <nav className="flex flex-wrap gap-2 mb-10">
            <Link
              href={blogHref({ q: search })}
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
                href={blogHref({ category: c.slug, q: search })}
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
            {search
              ? `No posts match “${search}”.`
              : category
                ? 'No posts in this category yet.'
                : 'No posts yet — check back soon.'}
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              hrefFor={(p) => blogHref({ category, q: search, page: p })}
            />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
