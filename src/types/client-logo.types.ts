// src/types/client-logo.types.ts
import type { IPagination } from '@/types/project.types';

export interface IClientLogo {
  id: string;
  name: string;
  logo: string;
  websiteUrl: string | null;
  isPublished: boolean;
  displayOrder: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface IClientLogosQueryParams {
  isPublished?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface IPaginatedClientLogos {
  status: 'success';
  message: string;
  data: IClientLogo[];
  pagination: IPagination;
}

export interface IClientLogoResponse {
  status: 'success';
  message: string;
  data: IClientLogo;
}

export interface IToggleClientLogoResponse {
  status: 'success';
  message: string;
  data: { id: string; isPublished: boolean };
}
