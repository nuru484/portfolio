// src/components/dashboard/DashboardOverview.tsx
'use client';

import Link from 'next/link';
import { FolderGit2, PenSquare, Quote } from 'lucide-react';
import { useGetDashboardStatsQuery } from '@/redux/dashboard-api';
import { StatsCard } from '@/components/dashboard/StatsCard';
import {
  StatsCardsSkeleton,
  RecentListSkeleton,
} from '@/components/dashboard/Skeletons';

function StatusPill({ published }: { published: boolean }) {
  return (
    <span
      className={
        published
          ? 'rounded-full bg-foreground px-2.5 py-0.5 text-xs font-medium text-background'
          : 'rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground'
      }
    >
      {published ? 'Published' : 'Draft'}
    </span>
  );
}

export function DashboardOverview({ firstName }: { firstName: string }) {
  const { data, isLoading, isError, refetch } = useGetDashboardStatsQuery();
  const stats = data?.data;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome back, {firstName}
        </h1>
        <p className="mt-1 text-muted-foreground">
          Your content and accounts at a glance.
        </p>
      </div>

      {isLoading ? (
        <>
          <StatsCardsSkeleton />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <div className="mb-3 h-4 w-32 animate-pulse rounded bg-muted" />
              <RecentListSkeleton />
            </div>
            <div>
              <div className="mb-3 h-4 w-32 animate-pulse rounded bg-muted" />
              <RecentListSkeleton />
            </div>
          </div>
        </>
      ) : isError || !stats ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-6 text-center text-sm text-destructive">
          Failed to load dashboard stats.{' '}
          <button onClick={() => refetch()} className="underline">
            Retry
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatsCard
              title="Projects"
              value={stats.projects.total}
              icon={FolderGit2}
              iconClassName="bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
              metadata={[
                { label: 'Published', value: stats.projects.published },
                { label: 'Drafts', value: stats.projects.draft },
              ]}
            />
            <StatsCard
              title="Blog posts"
              value={stats.posts.total}
              icon={PenSquare}
              iconClassName="bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
              metadata={[
                { label: 'Published', value: stats.posts.published },
                { label: 'Drafts', value: stats.posts.draft },
              ]}
            />
            <StatsCard
              title="Testimonials"
              value={stats.testimonials.total}
              icon={Quote}
              iconClassName="bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
              metadata={[
                { label: 'Published', value: stats.testimonials.published },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <section>
              <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Recent posts
              </h2>
              {stats.recentPosts.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
                  No posts yet.
                </div>
              ) : (
                <div className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden">
                  {stats.recentPosts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/dashboard/blog/${p.id}`}
                      className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-muted transition-colors"
                    >
                      <span className="truncate text-sm font-medium">{p.title}</span>
                      <StatusPill published={p.isPublished} />
                    </Link>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Recent projects
              </h2>
              {stats.recentProjects.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
                  No projects yet.
                </div>
              ) : (
                <div className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden">
                  {stats.recentProjects.map((p) => (
                    <Link
                      key={p.id}
                      href={`/dashboard/projects/${p.id}`}
                      className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-muted transition-colors"
                    >
                      <span className="truncate text-sm font-medium">{p.title}</span>
                      <StatusPill published={p.isPublished} />
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </div>
        </>
      )}
    </div>
  );
}
