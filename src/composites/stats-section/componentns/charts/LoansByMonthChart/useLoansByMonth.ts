import { Loan } from 'entities/loan/model';

export const useLoansByMonth = (loans: Loan[]) => {
    const counts: Record<string, number> = {};

    loans.forEach(loan => {
        const date = new Date(loan.loanDate);
        const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });
        counts[month] = (counts[month] || 0) + 1;
    });

    const labels = Object.keys(counts).sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );
    const data = labels.map(label => counts[label]);

    return { labels, data };
};
