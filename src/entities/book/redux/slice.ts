import { createSlice } from '@reduxjs/toolkit';
import { BookState } from './types';
import { loadBooks } from 'entities/book/redux/thunks';

const initialState: BookState = {
    items: [],
    loading: false,
    error: null,
};

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadBooks.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadBooks.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(loadBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error
                    ? new Error(action.error.message)
                    : new Error('Failed to load books');
            });
    },
});

export default booksSlice.reducer;
