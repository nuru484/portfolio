// src/types/category.types.ts

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  postsCount?: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface ICategoriesResponse {
  status: 'success';
  message: string;
  data: ICategory[];
}

export interface ICategoryResponse {
  status: 'success';
  message: string;
  data: ICategory;
}

export interface ICategoryInput {
  name: string;
}
