// src/redux/testimonial-api.ts
import { apiSlice } from './api-slice';
import type {
  IPaginatedTestimonials,
  ITestimonialResponse,
  IToggleTestimonialResponse,
  ITestimonialsQueryParams,
} from '@/types/testimonial.types';

function toQueryString(params: ITestimonialsQueryParams = {}): string {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      sp.append(key, String(value));
    }
  });
  const qs = sp.toString();
  return qs ? `?${qs}` : '';
}

export const testimonialApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTestimonials: builder.query<
      IPaginatedTestimonials,
      ITestimonialsQueryParams | void
    >({
      query: (params) => `testimonials${toQueryString(params ?? {})}`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((t) => ({
                type: 'Testimonial' as const,
                id: t.id,
              })),
              'Testimonials',
            ]
          : ['Testimonials'],
    }),

    getTestimonial: builder.query<ITestimonialResponse, string>({
      query: (id) => `testimonials/${id}`,
      providesTags: (_r, _e, id) => [{ type: 'Testimonial', id }],
    }),

    createTestimonial: builder.mutation<ITestimonialResponse, FormData>({
      query: (formData) => ({
        url: 'testimonials',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Testimonials'],
    }),

    updateTestimonial: builder.mutation<
      ITestimonialResponse,
      { id: string; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `testimonials/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'Testimonial', id },
        'Testimonials',
      ],
    }),

    deleteTestimonial: builder.mutation<
      { status: string; message: string; data: { id: string } },
      string
    >({
      query: (id) => ({ url: `testimonials/${id}`, method: 'DELETE' }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'Testimonial', id },
        'Testimonials',
      ],
    }),

    toggleTestimonialPublish: builder.mutation<
      IToggleTestimonialResponse,
      string
    >({
      query: (id) => ({
        url: `testimonials/${id}/toggle-publish`,
        method: 'PATCH',
      }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'Testimonial', id },
        'Testimonials',
      ],
    }),
  }),
});

export const {
  useGetAllTestimonialsQuery,
  useGetTestimonialQuery,
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
  useToggleTestimonialPublishMutation,
} = testimonialApi;
