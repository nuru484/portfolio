import { NavBar } from '@/components/NavBar';
import { Skeleton } from '@/components/ui/skeleton';

/** Content-shaped placeholder for the blog list while it renders. */
export default function BlogLoading() {
  return (
    <>
      <NavBar />
      <main className="font-urbanist mx-auto w-full max-w-6xl px-6 md:px-12 pt-10 pb-16">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="mt-4 h-5 w-full max-w-xl" />
        <Skeleton className="mt-8 h-10 w-full max-w-md" />

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
