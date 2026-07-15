import { NavBar } from '@/components/NavBar';
import { Skeleton } from '@/components/ui/skeleton';

/** Article-shaped placeholder for a blog post while it renders. */
export default function BlogPostLoading() {
  return (
    <>
      <NavBar />
      <main className="font-urbanist mx-auto w-full max-w-3xl px-6 md:px-12 pt-6 pb-16">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-8 h-6 w-24 rounded-full" />
        <Skeleton className="mt-4 h-12 w-full" />
        <Skeleton className="mt-3 h-12 w-3/4" />
        <Skeleton className="mt-6 h-5 w-64" />
        <Skeleton className="mt-10 aspect-[16/9] w-full rounded-2xl" />
        <div className="mt-10 space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full last:w-2/3" />
          ))}
        </div>
      </main>
    </>
  );
}
