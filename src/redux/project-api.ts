// src/redux/project-api.ts
import { apiSlice } from './api-slice';
import type {
  IPaginatedProjects,
  IProjectResponse,
  IToggleProjectResponse,
  IProjectsQueryParams,
} from '@/types/project.types';

function toQueryString(params: IProjectsQueryParams = {}): string {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      sp.append(key, String(value));
    }
  });
  const qs = sp.toString();
  return qs ? `?${qs}` : '';
}

export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query<IPaginatedProjects, IProjectsQueryParams | void>({
      query: (params) => `projects${toQueryString(params ?? {})}`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((p) => ({ type: 'Project' as const, id: p.id })),
              'Projects',
            ]
          : ['Projects'],
    }),

    getProject: builder.query<IProjectResponse, string>({
      query: (id) => `projects/${id}`,
      providesTags: (_r, _e, id) => [{ type: 'Project', id }],
    }),

    createProject: builder.mutation<IProjectResponse, FormData>({
      query: (formData) => ({ url: 'projects', method: 'POST', body: formData }),
      invalidatesTags: ['Projects'],
    }),

    updateProject: builder.mutation<
      IProjectResponse,
      { id: string; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `projects/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'Project', id }, 'Projects'],
    }),

    deleteProject: builder.mutation<
      { status: string; message: string; data: { id: string } },
      string
    >({
      query: (id) => ({ url: `projects/${id}`, method: 'DELETE' }),
      invalidatesTags: (_r, _e, id) => [{ type: 'Project', id }, 'Projects'],
    }),

    toggleProjectPublish: builder.mutation<IToggleProjectResponse, string>({
      query: (id) => ({ url: `projects/${id}/toggle-publish`, method: 'PATCH' }),
      invalidatesTags: (_r, _e, id) => [{ type: 'Project', id }, 'Projects'],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useToggleProjectPublishMutation,
} = projectApi;
