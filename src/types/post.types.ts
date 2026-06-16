// src/types/post.types.ts
import type { IPagination } from '@/types/project.types';

export interface IPostAuthor {
  id: string;
  fullname: string;
  email: string;
}

export interface IPostCategory {
  id: string;
  name: string;
  slug: string;
}

export interface IPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  readTime: string;
  isPublished: boolean;
  isFeatured: boolean;
  publishDate: string | Date | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  author: IPostAuthor;
  category: IPostCategory | null;
}

/** List/card shape — the full content body is omitted for list endpoints. */
export type IPostListItem = Omit<IPost, 'content'>;

export interface IPostsQueryParams {
  categoryId?: string;
  categorySlug?: string;
  isPublished?: boolean;
  isFeatured?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface IPaginatedPosts {
  status: 'success';
  message: string;
  data: IPostListItem[];
  pagination: IPagination;
}

export interface IPostResponse {
  status: 'success';
  message: string;
  data: IPost;
}

export interface ITogglePostResponse {
  status: 'success';
  message: string;
  data: { id: string; isPublished?: boolean; isFeatured?: boolean };
}
