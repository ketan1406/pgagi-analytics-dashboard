// store/financeApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const financeApi = createApi({
  reducerPath: 'financeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.alphavantage.co/query',
  }),
  endpoints: (builder) => ({
    getStockQuote: builder.query<any, string>({
      // symbol might be "AAPL", "TSLA", etc.
      query: (symbol) => ({
        url: '',
        params: {
          function: 'GLOBAL_QUOTE',
          symbol,
          apikey: process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY,
        },
      }),
    }),
  }),
});

export const { useGetStockQuoteQuery } = financeApi;
