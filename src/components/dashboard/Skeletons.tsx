// src/components/dashboard/Skeletons.tsx

function Shimmer({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-muted ${className ?? ''}`} />;
}

export function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <Shimmer className="h-9 w-9 rounded-full" />
            <Shimmer className="h-4 w-24" />
          </div>
          <Shimmer className="mt-4 h-8 w-16" />
          <Shimmer className="mt-3 h-3 w-32" />
        </div>
      ))}
    </div>
  );
}

export function RecentListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card divide-y divide-border">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center justify-between gap-4 px-5 py-4">
          <Shimmer className="h-4 w-2/3" />
          <Shimmer className="h-5 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}

/** Generic list skeleton for admin manage screens — mirrors the responsive
 *  list (borderless rows on mobile, contained card from sm up). */
export function ManageListSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="divide-y divide-border sm:overflow-hidden sm:rounded-2xl sm:border sm:border-border sm:bg-card">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-4 sm:px-5">
          <Shimmer className="h-12 w-12 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Shimmer className="h-4 w-1/3" />
            <Shimmer className="h-3 w-1/4" />
          </div>
          <Shimmer className="h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}
