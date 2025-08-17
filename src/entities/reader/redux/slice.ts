import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReaderState } from './types';
import { loadReaders, createReader } from './thunks';
import { Reader } from '../types';

const initialState: ReaderState = {
    items: [],
    loading: false,
    error: null,
};

const readersSlice = createSlice({
    name: 'readers',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadReaders.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadReaders.fulfilled, (state, action: PayloadAction<Reader[]>) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(loadReaders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error
                    ? new Error(action.error.message)
                    : new Error('Failed to load readers');
            })
            .addCase(createReader.fulfilled, (state, action: PayloadAction<Reader>) => {
                state.items.push(action.payload);
            });
    },
});

export default readersSlice.reducer;
