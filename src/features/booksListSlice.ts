import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../app/store';
import { BOOKS } from '../app/db';
import { sleep } from '../app/helpers';
import { BookType } from '../types';

let CURRENT_ID = BOOKS.length;
export interface BooksListState {
  books: BookType[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: BooksListState = {
  books: BOOKS,
  status: 'idle',
};


export const addBook = createAsyncThunk(
  'book/add',
  async (book: BookType) => {
    await sleep(); // Simulate a PUT request
    return book;
  }
);

export const deleteBook = createAsyncThunk(
  'book/delete',
  async (id: BookType['id']) => {
    await sleep(); // Simulate a DELETE request
    return id;
  }
);

export const editBook = createAsyncThunk(
  'book/edit',
  async (book: BookType) => {
    await sleep(); // Simulate a POST request
    return book;
  }
);

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /** ADD BOOK */
    builder
      .addCase(addBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addBook.fulfilled, (state, action: PayloadAction<BookType>) => {
        ++CURRENT_ID;

        state.status = 'idle';
        state.books.push(
          {
            ...action.payload,
            id: CURRENT_ID.toString()
          }
        )
      })
      .addCase(addBook.rejected, (state) => {
        state.status = 'failed';
      });

    /** DELETE BOOK */
    builder
      .addCase(deleteBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBook.fulfilled, (state, action: PayloadAction<BookType['id']>) => {
        const index = state.books.findIndex(({ id }) => id === action.payload);

        state.books.splice(index, 1)
        state.status = 'idle';
      })
      .addCase(deleteBook.rejected, (state) => {
        state.status = 'failed';
      });

    /** EDIT BOOK */
    builder
      .addCase(editBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editBook.fulfilled, (state, action: PayloadAction<BookType>) => {
        const index = state.books.findIndex(({ id }) => id === action.payload.id);

        state.status = 'idle';
        state.books[index] = {...action.payload}
      })
      .addCase(editBook.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectBooksList = (state: RootState) => state.booksListPage.books;
export const selectStatus = (state: RootState) => state.booksListPage.status;

export default booksSlice.reducer;
