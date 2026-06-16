// src/redux/api-slice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { apiSliceTags } from '@/types/api';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/',
  credentials: 'include',
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // Session expired / not signed in → bounce to login.
  if (result.error?.status === 401 && typeof window !== 'undefined') {
    window.location.href = '/login';
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: apiSliceTags,
  endpoints: () => ({}),
});
