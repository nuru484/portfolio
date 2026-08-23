// src/components/projects/ProjectTabs.tsx
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { projectsHref } from '@/utils/projects-href';
import type { ProjectType } from '@/types/project.types';

/**
 * The two project groups. Real links rather than ARIA tabs: each one is a
 * separate server-rendered page with its own pagination, so a middle-click
 * or a shared URL has to work, and `role="tab"` would promise client-side
 * panel switching that does not happen here.
 */
export const PROJECT_TABS: {
  type: ProjectType;
  label: string;
  blurb: string;
}[] = [
  {
    type: 'CLIENT',
    label: 'Client Projects',
    blurb: 'Production systems built for real businesses.',
  },
  {
    type: 'SIDE',
    label: 'Side Projects',
    blurb: 'Personal builds - experiments, tools, and things I wanted to exist.',
  },
];

export function ProjectTabs({
  active,
  counts,
}: {
  active: ProjectType;
  counts: Record<ProjectType, number>;
}) {
  return (
    <nav
      aria-label="Project type"
      className="max-w-6xl mx-auto px-6 md:px-12 font-urbanist"
    >
      <ul className="flex flex-wrap gap-x-6 gap-y-2 border-b border-border">
        {PROJECT_TABS.map(({ type, label }) => {
          const isActive = type === active;
          return (
            <li key={type}>
              <Link
                href={projectsHref(type)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'inline-flex items-center gap-2 border-b-2 px-1 pb-3 pt-2 text-base font-semibold transition-colors sm:text-lg',
                  isActive
                    ? 'border-foreground text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground',
                )}
              >
                {label}
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-xs font-medium tabular-nums',
                    isActive
                      ? 'bg-foreground text-background'
                      : 'bg-muted text-muted-foreground',
                  )}
                >
                  {counts[type]}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
