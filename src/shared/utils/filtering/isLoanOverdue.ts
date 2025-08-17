import { Loan } from 'entities/loan/model';

export const isLoanOverdue = (loan: Loan, referenceDate: Date = new Date()): boolean => {
    const loanDate = new Date(loan.loanDate);
    const returnDate = loan.returnDate ? new Date(loan.returnDate) : referenceDate;

    const dueDate = new Date(loanDate);
    dueDate.setMonth(dueDate.getMonth() + 3);

    return returnDate > dueDate;
};
