// src/redux/client-logo-api.ts
import { apiSlice } from './api-slice';
import type {
  IPaginatedClientLogos,
  IClientLogoResponse,
  IToggleClientLogoResponse,
  IClientLogosQueryParams,
} from '@/types/client-logo.types';

function toQueryString(params: IClientLogosQueryParams = {}): string {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      sp.append(key, String(value));
    }
  });
  const qs = sp.toString();
  return qs ? `?${qs}` : '';
}

export const clientLogoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllClientLogos: builder.query<
      IPaginatedClientLogos,
      IClientLogosQueryParams | void
    >({
      query: (params) => `client-logos${toQueryString(params ?? {})}`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((c) => ({
                type: 'ClientLogo' as const,
                id: c.id,
              })),
              'ClientLogos',
            ]
          : ['ClientLogos'],
    }),

    getClientLogo: builder.query<IClientLogoResponse, string>({
      query: (id) => `client-logos/${id}`,
      providesTags: (_r, _e, id) => [{ type: 'ClientLogo', id }],
    }),

    createClientLogo: builder.mutation<IClientLogoResponse, FormData>({
      query: (formData) => ({
        url: 'client-logos',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['ClientLogos'],
    }),

    updateClientLogo: builder.mutation<
      IClientLogoResponse,
      { id: string; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `client-logos/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'ClientLogo', id },
        'ClientLogos',
      ],
    }),

    deleteClientLogo: builder.mutation<
      { status: string; message: string; data: { id: string } },
      string
    >({
      query: (id) => ({ url: `client-logos/${id}`, method: 'DELETE' }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'ClientLogo', id },
        'ClientLogos',
      ],
    }),

    toggleClientLogoPublish: builder.mutation<
      IToggleClientLogoResponse,
      string
    >({
      query: (id) => ({
        url: `client-logos/${id}/toggle-publish`,
        method: 'PATCH',
      }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'ClientLogo', id },
        'ClientLogos',
      ],
    }),
  }),
});

export const {
  useGetAllClientLogosQuery,
  useGetClientLogoQuery,
  useCreateClientLogoMutation,
  useUpdateClientLogoMutation,
  useDeleteClientLogoMutation,
  useToggleClientLogoPublishMutation,
} = clientLogoApi;
