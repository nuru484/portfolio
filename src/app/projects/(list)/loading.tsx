import { NavBar } from '@/components/NavBar';
import { Skeleton } from '@/components/ui/skeleton';

/** Row-shaped placeholder matching the alternating project cards. */
export default function ProjectsLoading() {
  return (
    <>
      <NavBar />
      <main className="font-urbanist w-full pb-16">
        <header className="py-12 md:py-20 max-w-6xl mx-auto px-6 md:px-12">
          <Skeleton className="h-12 w-56 md:h-16" />
          <Skeleton className="mt-4 h-5 w-full max-w-xl" />
        </header>

        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-3 h-5 w-72" />
        </div>

        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="max-w-6xl mx-auto px-6 md:px-12 py-4 md:py-12">
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
                <Skeleton className="h-7 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex gap-2">
                  <Skeleton className="h-7 w-20 rounded-full" />
                  <Skeleton className="h-7 w-24 rounded-full" />
                  <Skeleton className="h-7 w-16 rounded-full" />
                </div>
                <div className="flex gap-2 pt-2">
                  <Skeleton className="h-9 w-28 rounded-full" />
                  <Skeleton className="h-9 w-28 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
