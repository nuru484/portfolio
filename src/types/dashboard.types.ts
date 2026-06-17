// src/types/dashboard.types.ts

export interface IDashboardStats {
  projects: { total: number; published: number; draft: number };
  posts: { total: number; published: number; draft: number };
  testimonials: { total: number; published: number };
  users: { total: number; admins: number };
  recentPosts: {
    id: string;
    slug: string;
    title: string;
    isPublished: boolean;
    createdAt: string | Date;
  }[];
  recentProjects: {
    id: string;
    title: string;
    isPublished: boolean;
    createdAt: string | Date;
  }[];
}

export interface IDashboardStatsResponse {
  status: 'success';
  message: string;
  data: IDashboardStats;
}
