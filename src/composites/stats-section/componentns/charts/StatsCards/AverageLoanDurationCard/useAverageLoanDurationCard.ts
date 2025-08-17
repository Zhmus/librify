import { Loan } from 'entities/loan/model';

export const useAverageLoanDurationCard = (loans: Loan[]) => {
    const returnedLoans = loans.filter(l => l.returnDate);

    if (!returnedLoans.length) return { total: 0 };

    const averageDuration =
        returnedLoans.reduce((sum, loan) => {
            const loanDate = new Date(loan.loanDate);
            const returnDate = new Date(loan.returnDate!);
            return sum + (returnDate.getTime() - loanDate.getTime()) / (1000 * 60 * 60 * 24);
        }, 0) / returnedLoans.length;

    return { total: Math.round(averageDuration) };
};
