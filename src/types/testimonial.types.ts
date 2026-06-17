// src/types/testimonial.types.ts
import type { IPagination } from '@/types/project.types';

export interface ITestimonialSocial {
  platform: string;
  url: string;
}

export interface ITestimonial {
  id: string;
  author: string;
  role: string;
  quote: string;
  image: string | null;
  socials: ITestimonialSocial[];
  isPublished: boolean;
  displayOrder: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface ITestimonialsQueryParams {
  isPublished?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface IPaginatedTestimonials {
  status: 'success';
  message: string;
  data: ITestimonial[];
  pagination: IPagination;
}

export interface ITestimonialResponse {
  status: 'success';
  message: string;
  data: ITestimonial;
}

export interface IToggleTestimonialResponse {
  status: 'success';
  message: string;
  data: { id: string; isPublished: boolean };
}
