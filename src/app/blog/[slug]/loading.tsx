import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';

/** Mirrors a post: intro at max-w-3xl, cover at max-w-5xl, then prose. */
export default function BlogPostLoading() {
  return (
    <>
      <NavBar />
      <main id="main" className="font-urbanist">
        <div className="max-w-3xl mx-auto px-6 md:px-12 pt-6 pb-10">
          {/* Breadcrumb: home icon, arrow, "Blog". */}
          <div className="mb-8 flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-10" />
          </div>

          {/* Category pill. */}
          <Skeleton className="h-7 w-24 rounded-full" />

          <Skeleton className="mt-4 h-8 w-full sm:h-9 md:h-10 lg:h-12" />
          <Skeleton className="mt-2 h-8 w-4/5 sm:h-9 md:h-10 lg:h-12" />

          <div className="mt-4 space-y-2">
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-3/4" />
          </div>

          {/* Author, date, read time, then the share button on the right. */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="ml-auto h-8 w-20 rounded-full" />
          </div>
        </div>

        {/* Cover sits in a wider column than the prose. */}
        <div className="max-w-5xl mx-auto px-6 md:px-12 mb-10">
          <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
        </div>

        <div className="max-w-3xl mx-auto px-6 md:px-12 pb-16">
          {[6, 5, 7].map((lines, block) => (
            <div key={block} className="mb-8 space-y-3">
              {block > 0 && <Skeleton className="mb-4 h-7 w-1/2" />}
              {Array.from({ length: lines }).map((_, line) => (
                <Skeleton
                  key={line}
                  className={`h-4 ${line === lines - 1 ? 'w-2/3' : 'w-full'}`}
                />
              ))}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
