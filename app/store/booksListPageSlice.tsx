import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { AppState, AppThunk } from './store';
import { sleep } from '../helper';
import { BOOKS } from '../db';
import { AppStatus, iBook, Status } from '../../types';


export interface AuthState {
  status: Status;
  list: iBook[];
}

const initialState: AuthState = {
  status: AppStatus.IDLE,
  list: [],
};

let CURRENT_ID = BOOKS.length;

export const booksListPageSlice = createSlice({
  name: 'booksListPage',

  initialState,
  
  reducers: {
    setBooksList(state, action) {
      state.list = action.payload;
    },
    createBook(state, action) {
      state.list.push({
        ...action.payload,
        id: (++CURRENT_ID).toString(),
      });
      state.status = AppStatus.IDLE;
    },
    updateBook(state, action) {
      const index = state.list.findIndex(({ id }) => id === action.payload.id);
      state.list[index] = { ...action.payload }
      state.status = AppStatus.IDLE;
    },
    removeBook(state, action) {
      const index = state.list.findIndex(({ id }) => id === action.payload);
      state.list.splice(index, 1);
      state.status = AppStatus.IDLE;
    },
    setStatus(state, action) {
      state.status = action.payload;
    }
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    },
  },
});

export const { setBooksList, createBook, updateBook, removeBook, setStatus } = booksListPageSlice.actions;


export const fetchBooksList = (): AppThunk => 
  async dispatch => {
    await sleep(); // simulate GET request;
    dispatch(setBooksList(BOOKS));
  }

export const deleteBook = (id: iBook['id']): AppThunk => 
  async dispatch => {
    dispatch(setStatus(AppStatus.LOADING));
    await sleep(); // simulate DELETE request;
    dispatch(removeBook(id));
  }

export const addBook = (book: Omit<iBook, 'id'>): AppThunk =>
  async dispatch => {
    dispatch(setStatus(AppStatus.LOADING));
    await sleep(); // simulate PUT request;
    dispatch(createBook(book));
  }

export const editBook = (book: Omit<iBook, 'id'>): AppThunk =>
  async dispatch => {
    dispatch(setStatus(AppStatus.LOADING));
    await sleep(); // simulate POST request;
    dispatch(updateBook(book));
  }

export const selectBooksList = (state: AppState) => state.list;
export const selectAppStatus = (state: AppState) => state.status;

export default booksListPageSlice.reducer;
