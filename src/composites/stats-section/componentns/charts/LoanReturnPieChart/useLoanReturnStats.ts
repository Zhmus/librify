import { Loan } from 'entities/loan/model';
import { isLoanOverdue } from 'shared/utils/filtering/isLoanOverdue';

export const useLoanReturnStats = (loans: Loan[]) => {
    const now = new Date();

    const onTime = loans.filter(
        loan => !isLoanOverdue(loan, loan.returnDate ? new Date(loan.returnDate) : now)
    ).length;

    const overdue = loans.length - onTime;

    return { onTime, overdue };
};
