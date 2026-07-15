import { NavBar } from '@/components/NavBar';
import { Skeleton } from '@/components/ui/skeleton';

/** Content-shaped placeholder for the projects list while it renders. */
export default function ProjectsLoading() {
  return (
    <>
      <NavBar />
      <main className="font-urbanist mx-auto w-full max-w-6xl px-6 md:px-12 pt-10 pb-16">
        <Skeleton className="h-10 w-56" />
        <Skeleton className="mt-4 h-5 w-full max-w-xl" />

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[16/10] w-full rounded-2xl" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
