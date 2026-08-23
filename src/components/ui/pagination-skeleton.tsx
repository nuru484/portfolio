// src/components/ui/pagination-skeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';

/** Mirrors Pagination: a centred row of 40px pills. */
export function PaginationSkeleton({ items = 5 }: { items?: number }) {
  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-2 px-4">
      {Array.from({ length: items }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-10 rounded-full" />
      ))}
    </div>
  );
}
