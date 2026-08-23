// src/utils/projects-href.ts
//
// The projects page is two tabs, each paging through its own set. Client work
// is the default tab and page 1 is the bare path, so the canonical URL stays
// clean while every other state is reachable and shareable.

import type { ProjectType } from '@/types/project.types';

export function projectsHref(type: ProjectType, page = 1): string {
  const params = new URLSearchParams();
  if (type !== 'CLIENT') params.set('tab', 'side');
  if (page > 1) params.set('page', String(page));
  const query = params.toString();
  return query ? `/projects?${query}` : '/projects';
}

/** Parses the tab out of a query string; anything unknown means client work. */
export function parseProjectTab(tab: string | undefined): ProjectType {
  return tab === 'side' ? 'SIDE' : 'CLIENT';
}
