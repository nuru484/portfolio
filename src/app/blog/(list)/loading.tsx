import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import { PaginationSkeleton } from '@/components/ui/pagination-skeleton';

/** Mirrors the blog list: header, search pill, category pills, card grid. */
export default function BlogLoading() {
  return (
    <>
      <NavBar />
      <main
        id="main"
        className="font-urbanist mx-auto w-full max-w-6xl px-6 md:px-12 py-12 md:py-20"
      >
        <header className="mb-12 md:mb-16">
          <Skeleton className="h-12 w-56 lg:h-[72px] lg:w-72" />
          <div className="mt-4 max-w-2xl space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        </header>

        {/* Search field: a rounded-full bordered pill. */}
        <Skeleton className="mb-6 h-11 w-full max-w-md rounded-full" />

        {/* Category filter pills. */}
        <div className="mb-10 flex flex-wrap gap-2">
          {[16, 24, 20, 28, 18].map((w, i) => (
            <Skeleton
              key={i}
              className="h-9 rounded-full"
              style={{ width: `${w * 4}px` }}
            />
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
            >
              <Skeleton className="aspect-[16/9] w-full rounded-none" />
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-6 w-full" />
                <Skeleton className="mt-1.5 h-6 w-2/3" />
                <div className="mt-2 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-14" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <PaginationSkeleton />
      </main>
      <Footer />
    </>
  );
}
