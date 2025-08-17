import { RootState } from 'app/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectBooksState = (state: RootState) => state.books;
export const selectAllBooks = createSelector(selectBooksState, booksState => booksState.items);
