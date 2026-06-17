// src/redux/dashboard-api.ts
import { apiSlice } from './api-slice';
import type { IDashboardStatsResponse } from '@/types/dashboard.types';

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<IDashboardStatsResponse, void>({
      query: () => 'dashboard/stats',
      providesTags: ['Dashboard'],
      // Keep the cached result for 2 minutes so navigating back is instant.
      keepUnusedDataFor: 120,
    }),
  }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;
