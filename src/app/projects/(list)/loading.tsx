import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import { PaginationSkeleton } from '@/components/ui/pagination-skeleton';

/** Mirrors ProjectsList: header, the two tabs, alternating cards, paging. */
export default function ProjectsLoading() {
  return (
    <>
      <NavBar />
      <main id="main" className="font-urbanist w-full">
        <header className="py-12 md:py-20 max-w-6xl mx-auto px-6 md:px-12">
          {/* h1 is text-5xl / lg:text-7xl. */}
          <Skeleton className="h-12 w-64 lg:h-[72px] lg:w-80" />
          <div className="mt-4 max-w-2xl space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/5" />
          </div>
        </header>

        {/* Tab row: two labelled pills sitting on the underline. */}
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex gap-6 border-b border-border pb-3 pt-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-5 w-7 rounded-full" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-5 w-7 rounded-full" />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-12 pt-6">
          <Skeleton className="h-6 w-full max-w-md" />
        </div>

        <div className="mb-16 md:mb-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="max-w-6xl mx-auto px-6 md:px-12 py-4 md:py-12"
            >
              <div className="grid items-center gap-4 max-md:border max-md:border-border md:grid-cols-2 md:gap-8 lg:gap-14">
                <Skeleton
                  className={
                    'aspect-[16/10] w-full max-md:rounded-none md:rounded-2xl' +
                    (i % 2 === 1 ? ' md:order-2' : '')
                  }
                />
                <div
                  className={
                    'flex flex-col gap-4 max-md:px-3 max-md:pb-4' +
                    (i % 2 === 1 ? ' md:order-1' : '')
                  }
                >
                  {/* Title runs to two lines at these sizes. */}
                  <Skeleton className="h-7 w-full md:h-8 lg:h-9" />
                  <Skeleton className="h-7 w-2/3 md:h-8 lg:h-9" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-11/12" />
                    <Skeleton className="hidden h-5 w-3/4 md:block" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-8 w-20 rounded-full" />
                    <Skeleton className="h-8 w-24 rounded-full" />
                    <Skeleton className="h-8 w-16 rounded-full" />
                    <Skeleton className="h-8 w-24 rounded-full" />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Skeleton className="h-11 w-32 rounded-full" />
                    <Skeleton className="h-11 w-32 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <PaginationSkeleton />
        </div>
      </main>
      <Footer />
    </>
  );
}
