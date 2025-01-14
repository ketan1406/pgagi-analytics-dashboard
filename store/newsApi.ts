// store/newsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://newsapi.org/v2',
  }),
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<any, { category: string }>({
      query: ({ category }) => ({
        url: '/top-headlines',
        params: {
          category: category,
          country: 'us', // or any other country
          apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
        },
      }),
    }),
  }),
});

export const { useGetTopHeadlinesQuery } = newsApi;
