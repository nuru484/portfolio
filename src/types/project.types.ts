// src/types/project.types.ts

export interface IProject {
  id: string;
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  desktopImage: string;
  mobileImage: string;
  githubUrl: string | null;
  liveUrl: string | null;
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
