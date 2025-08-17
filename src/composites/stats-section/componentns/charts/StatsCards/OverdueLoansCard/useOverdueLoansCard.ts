import { Loan } from 'entities/loan/model';
import { isLoanOverdue } from 'shared/utils/filtering/isLoanOverdue';

export const useOverdueLoansCard = (loans: Loan[]) => {
    const overdue = loans.filter(l => !l.returnDate && isLoanOverdue(l));
    return { total: overdue.length };
};
