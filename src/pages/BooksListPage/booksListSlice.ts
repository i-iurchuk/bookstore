import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState, AppThunk } from '../../app/store';
import { Book } from '../../types';

export interface BooksListState {
  books: Book[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: BooksListState = {
  books: [],
  status: 'idle',
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
  },
});

export const {  } = booksSlice.actions;

export const selectCount = (state: RootState) => state.books.value;

export default booksSlice.reducer;
