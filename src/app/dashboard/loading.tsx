import { Skeleton } from '@/components/ui/skeleton';

/**
 * Route-transition placeholder for dashboard pages (the client pages have
 * their own data skeletons once mounted; this covers the RSC navigation gap).
 */
export default function DashboardLoading() {
  return (
    <div className="font-urbanist w-full space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-9 w-28" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 w-full rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  );
}
