// src/redux/post-api.ts
import { apiSlice } from './api-slice';
import type {
  IPaginatedPosts,
  IPostResponse,
  ITogglePostResponse,
  IPostsQueryParams,
} from '@/types/post.types';

function toQueryString(params: IPostsQueryParams = {}): string {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      sp.append(key, String(value));
    }
  });
  const qs = sp.toString();
  return qs ? `?${qs}` : '';
}

export const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query<IPaginatedPosts, IPostsQueryParams | void>({
      query: (params) => `posts${toQueryString(params ?? {})}`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((p) => ({ type: 'Post' as const, id: p.id })),
              'Posts',
            ]
          : ['Posts'],
    }),

    getPost: builder.query<IPostResponse, string>({
      query: (id) => `posts/${id}`,
      providesTags: (_r, _e, id) => [{ type: 'Post', id }],
    }),

    createPost: builder.mutation<IPostResponse, FormData>({
      query: (formData) => ({ url: 'posts', method: 'POST', body: formData }),
      invalidatesTags: ['Posts', 'Categories'],
    }),

    updatePost: builder.mutation<IPostResponse, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `posts/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'Post', id }, 'Posts', 'Categories'],
    }),

    deletePost: builder.mutation<
      { status: string; message: string; data: { id: string } },
      string
    >({
      query: (id) => ({ url: `posts/${id}`, method: 'DELETE' }),
      invalidatesTags: (_r, _e, id) => [{ type: 'Post', id }, 'Posts', 'Categories'],
    }),

    togglePostPublish: builder.mutation<ITogglePostResponse, string>({
      query: (id) => ({ url: `posts/${id}/toggle-publish`, method: 'PATCH' }),
      invalidatesTags: (_r, _e, id) => [{ type: 'Post', id }, 'Posts', 'Categories'],
    }),

    togglePostFeatured: builder.mutation<ITogglePostResponse, string>({
      query: (id) => ({ url: `posts/${id}/toggle-featured`, method: 'PATCH' }),
      invalidatesTags: (_r, _e, id) => [{ type: 'Post', id }, 'Posts'],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useTogglePostPublishMutation,
  useTogglePostFeaturedMutation,
} = postApi;
