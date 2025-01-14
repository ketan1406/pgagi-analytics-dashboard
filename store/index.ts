import { configureStore } from '@reduxjs/toolkit';
import { weatherApi } from './weatherApi';
import { newsApi } from './newsApi';
import { financeApi } from './financeApi';

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [financeApi.reducerPath]: financeApi.reducer,
    // Additional slices...
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(weatherApi.middleware)
      .concat(newsApi.middleware)
      .concat(financeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
