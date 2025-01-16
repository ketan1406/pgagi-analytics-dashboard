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
          country: 'us', // or 'uk', 'ca', etc.
          apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
          pageSize: 9, // for example, limit to 9 articles (optional)
        },
      }),
    }),
  }),
});

export const { useGetTopHeadlinesQuery } = newsApi;
