import { RootState } from 'app/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectLoansState = (state: RootState) => state.loans;

export const selectAllLoans = createSelector(selectLoansState, loansState => loansState.items);

export const selectLoansByBookId = (bookId: number) =>
    createSelector(selectAllLoans, loans => loans.filter(loan => loan.bookId === bookId));

export const selectLoansByUserId = (userId: number) =>
    createSelector(selectAllLoans, loans => loans.filter(loan => loan.userId === userId));
