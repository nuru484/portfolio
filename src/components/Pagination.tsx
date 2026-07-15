// src/components/Pagination.tsx
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  page: number;
  totalPages: number;
  /** Builds the href for a given page number, preserving other query params. */
  hrefFor: (page: number) => string;
}

/** Returns the page numbers to render, inserting `'…'` gaps for long ranges. */
function pageWindow(page: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | '…')[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(total - 1, page + 1);

  if (start > 2) pages.push('…');
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push('…');
  pages.push(total);

  return pages;
}

const baseItem =
  'inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-medium transition-colors';

/**
 * Server-rendered, link-based pagination. Renders nothing for a single page.
 * Navigation is real URLs (`?page=N`) so it works without client JS and keeps
 * the data fetch on the server.
 */
export function Pagination({ page, totalPages, hrefFor }: PaginationProps) {
  if (totalPages <= 1) return null;

  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <nav
      className="mt-12 flex flex-wrap items-center justify-center gap-2 px-4 font-urbanist"
      aria-label="Pagination"
    >
      {prevDisabled ? (
        <span className={cn(baseItem, 'border-border text-muted-foreground/40')}>
          <ChevronLeft className="h-4 w-4" />
        </span>
      ) : (
        <Link
          href={hrefFor(page - 1)}
          className={cn(
            baseItem,
            'border-border text-foreground hover:bg-muted',
          )}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      )}

      {pageWindow(page, totalPages).map((p, i) =>
        p === '…' ? (
          <span
            key={`gap-${i}`}
            className="px-1 text-muted-foreground select-none"
          >
            …
          </span>
        ) : (
          <Link
            key={p}
            href={hrefFor(p)}
            aria-current={p === page}
            className={cn(
              baseItem,
              p === page
                ? 'border-foreground bg-foreground text-background'
                : 'border-border text-foreground hover:bg-muted',
            )}
          >
            {p}
          </Link>
        ),
      )}

      {nextDisabled ? (
        <span className={cn(baseItem, 'border-border text-muted-foreground/40')}>
          <ChevronRight className="h-4 w-4" />
        </span>
      ) : (
        <Link
          href={hrefFor(page + 1)}
          className={cn(
            baseItem,
            'border-border text-foreground hover:bg-muted',
          )}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </nav>
  );
}
