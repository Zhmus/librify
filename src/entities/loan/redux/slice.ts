import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoanState } from './types';
import { loadLoans, checkoutBook, returnBook } from './thunks';
import { Loan } from '../model';

const initialState: LoanState = {
    items: [],
    loading: false,
    error: null,
};

const loansSlice = createSlice({
    name: 'loans',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadLoans.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadLoans.fulfilled, (state, action: PayloadAction<Loan[]>) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(loadLoans.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error
                    ? new Error(action.error.message)
                    : new Error('Failed to load loans');
            })
            .addCase(checkoutBook.fulfilled, (state, action: PayloadAction<Loan>) => {
                state.items.push(action.payload);
            })
            .addCase(checkoutBook.rejected, (state, action) => {
                state.error = action.error
                    ? new Error(action.error.message)
                    : new Error('Failed to checkout book');
            })
            .addCase(returnBook.fulfilled, (state, action: PayloadAction<Loan>) => {
                const index = state.items.findIndex(l => l.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(returnBook.rejected, (state, action) => {
                state.error = action.error
                    ? new Error(action.error.message)
                    : new Error('Failed to return book');
            });
    },
});

export default loansSlice.reducer;
