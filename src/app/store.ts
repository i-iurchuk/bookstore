import { configureStore } from '@reduxjs/toolkit';

import booksListSlice from '../features/booksListSlice';

export const store = configureStore({
  reducer: {
    booksListPage: booksListSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
