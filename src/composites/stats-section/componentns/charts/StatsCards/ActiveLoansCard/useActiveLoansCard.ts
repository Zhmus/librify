import { Loan } from 'entities/loan/model';

export const useActiveLoansCard = (loans: Loan[]) => {
    const active = loans.filter(l => !l.returnDate);
    return { total: active.length };
};
