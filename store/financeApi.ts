// store/financeApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const financeApi = createApi({
  reducerPath: 'financeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://eodhistoricaldata.com/api',
  }),
  endpoints: (builder) => ({
    getStockQuote: builder.query<any, string>({
      /**
       * Fetch EOD data for a specific stock symbol.
       * Example Endpoint: /eod/{symbol}?api_token=YOUR_API_KEY&fmt=json
       */
      query: (symbol) => ({
        url: `/eod/${symbol}`,
        params: {
          api_token: process.env.NEXT_PUBLIC_EODHD_API_KEY,
          fmt: 'json',
        },
      }),
    }),
    // Add more endpoints as needed, e.g., historical data, etc.
  }),
});

export const { useGetStockQuoteQuery } = financeApi;
