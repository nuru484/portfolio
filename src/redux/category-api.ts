// src/redux/category-api.ts
import { apiSlice } from './api-slice';
import type {
  ICategoriesResponse,
  ICategoryResponse,
  ICategoryInput,
} from '@/types/category.types';

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<ICategoriesResponse, void>({
      query: () => 'posts/categories',
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((c) => ({ type: 'Category' as const, id: c.id })),
              'Categories',
            ]
          : ['Categories'],
    }),

    createCategory: builder.mutation<ICategoryResponse, ICategoryInput>({
      query: (body) => ({ url: 'posts/categories', method: 'POST', body }),
      invalidatesTags: ['Categories'],
    }),

    updateCategory: builder.mutation<
      ICategoryResponse,
      { id: string; body: ICategoryInput }
    >({
      query: ({ id, body }) => ({
        url: `posts/categories/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'Category', id }, 'Categories', 'Posts'],
    }),

    deleteCategory: builder.mutation<
      { status: string; message: string; data: { id: string } },
      string
    >({
      query: (id) => ({ url: `posts/categories/${id}`, method: 'DELETE' }),
      invalidatesTags: (_r, _e, id) => [{ type: 'Category', id }, 'Categories', 'Posts'],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
