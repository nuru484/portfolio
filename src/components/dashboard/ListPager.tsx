// src/components/dashboard/ListPager.tsx
'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

/** Compact prev/next pager for client-fetched admin lists. */
export function ListPager({
  page,
  totalPages,
  total,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const btn =
    'inline-flex h-9 items-center gap-1 rounded-full border border-border px-3 text-sm font-medium transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40';

  return (
    <div className="mt-6 flex items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPages} · {total} total
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className={btn}
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="h-4 w-4" /> Prev
        </button>
        <button
          type="button"
          className={btn}
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
