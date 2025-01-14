// store/weatherApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5',
  }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query<any, string>({
      query: (city) => ({
        url: `/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`,
      }),
    }),
  }),
});

export const { useGetWeatherByCityQuery } = weatherApi;
