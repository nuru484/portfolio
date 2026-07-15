// src/types/project.types.ts

/** Mirrors the Prisma `ProjectType` enum. */
export type ProjectType = 'CLIENT' | 'SIDE';

export interface IProject {
  id: string;
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl: string | null;
  liveUrl: string | null;
  /** Case-study sections (plain text) shown on /projects/[slug]. */
  overview: string | null;
  problem: string | null;
  solution: string | null;
  outcome: string | null;
  screenshots: string[];
  youtubeUrl: string | null;
  projectType: ProjectType;
  /** When false the public site hides the "View Code" link. */
  isRepoPublic: boolean;
  isPublished: boolean;
  displayOrder: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface IProjectsQueryParams {
  isPublished?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IPaginatedProjects {
  status: 'success';
  message: string;
  data: IProject[];
  pagination: IPagination;
}

export interface IProjectResponse {
  status: 'success';
  message: string;
  data: IProject;
}

export interface IToggleProjectResponse {
  status: 'success';
  message: string;
  data: { id: string; isPublished: boolean };
}
