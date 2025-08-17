import { Reader } from 'entities/reader/types';
import { Loan } from 'entities/loan/model';

export const useTopReaders = (readers: Reader[], loans: Loan[]) => {
    const counts: Record<number, number> = {};

    loans.forEach(loan => {
        counts[loan.userId] = (counts[loan.userId] || 0) + 1;
    });

    return readers
        .map(reader => ({ ...reader, count: counts[reader.id] || 0 }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
};
