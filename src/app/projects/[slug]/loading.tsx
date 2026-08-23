import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';

/** Mirrors the case study: intro at max-w-4xl, cover at max-w-5xl, sections. */
export default function ProjectDetailLoading() {
  return (
    <>
      <NavBar />
      <main id="main" className="font-urbanist">
        <div className="max-w-4xl mx-auto px-6 md:px-12 pt-6 pb-10">
          {/* Breadcrumb: home icon, arrow, "Projects". */}
          <div className="mb-8 flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-16" />
          </div>

          {/* Client Project / Side Project eyebrow. */}
          <Skeleton className="h-4 w-28" />

          {/* h1 runs to two lines at these sizes. */}
          <Skeleton className="mt-3 h-8 w-full sm:h-9 md:h-10 lg:h-12" />
          <Skeleton className="mt-2 h-8 w-3/4 sm:h-9 md:h-10 lg:h-12" />

          <div className="mt-4 space-y-2">
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-5/6" />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {[20, 24, 16, 28, 18, 22].map((w, i) => (
              <Skeleton
                key={i}
                className="h-8 rounded-full"
                style={{ width: `${w * 4}px` }}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Skeleton className="h-11 w-36 rounded-full" />
            <Skeleton className="h-11 w-36 rounded-full" />
          </div>
        </div>

        {/* Cover sits in a wider column than the prose. */}
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
        </div>

        <div className="max-w-4xl mx-auto px-6 md:px-12 pb-16">
          {/* Overview, The Problem, The Solution, Outcome. */}
          {Array.from({ length: 4 }).map((_, section) => (
            <div key={section} className="mt-10">
              <Skeleton className="h-4 w-32" />
              <div className="mt-3 space-y-2.5">
                {Array.from({ length: 4 }).map((_, line) => (
                  <Skeleton
                    key={line}
                    className={`h-5 ${line === 3 ? 'w-2/3' : 'w-full'}`}
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="mt-10">
            <Skeleton className="h-4 w-28" />
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="aspect-[16/10] w-full rounded-xl"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
