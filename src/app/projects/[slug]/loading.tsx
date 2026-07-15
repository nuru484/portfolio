import { NavBar } from '@/components/NavBar';
import { Skeleton } from '@/components/ui/skeleton';

/** Case-study-shaped placeholder for a project detail while it renders. */
export default function ProjectDetailLoading() {
  return (
    <>
      <NavBar />
      <main className="font-urbanist mx-auto w-full max-w-4xl px-6 md:px-12 pt-6 pb-16">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-8 h-4 w-28" />
        <Skeleton className="mt-4 h-12 w-full" />
        <Skeleton className="mt-3 h-6 w-3/4" />
        <div className="mt-6 flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-20 rounded-full" />
          ))}
        </div>
        <Skeleton className="mt-8 h-10 w-56 rounded-full" />
        <Skeleton className="mt-10 aspect-[16/9] w-full rounded-2xl" />
        <div className="mt-10 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full last:w-2/3" />
          ))}
        </div>
      </main>
    </>
  );
}
