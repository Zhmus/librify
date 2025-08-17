import { createAsyncThunk } from '@reduxjs/toolkit';
import { Loan } from '../model';
import * as loansService from '../service';
import { returnLoan } from 'entities/loan/factory';

export const loadLoans = createAsyncThunk<Loan[]>('loans/loadLoans', async () => {
    return await loansService.getLoans();
});

export const checkoutBook = createAsyncThunk<Loan, Loan>('loans/createLoan', async newLoan => {
    return await loansService.addLoan(newLoan);
});

export const returnBook = createAsyncThunk<Loan, { loanId: string }>(
    'loans/returnBook',
    async ({ loanId }) => {
        const partialLoan = returnLoan(loanId);
        return await loansService.updateLoan(loanId, partialLoan);
    }
);
