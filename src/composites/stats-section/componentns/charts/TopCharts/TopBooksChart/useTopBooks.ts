import { Book } from 'entities/book/types';
import { Loan } from 'entities/loan/model';

export const useTopBooks = (books: Book[], loans: Loan[]) => {
    const counts: Record<number, number> = {};

    loans.forEach(loan => {
        counts[loan.bookId] = (counts[loan.bookId] || 0) + 1;
    });

    return books
        .map(book => ({ ...book, count: counts[book.id] || 0 }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
};
