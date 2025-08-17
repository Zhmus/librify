import { Book, BookEnriched } from './types';
import { Loan } from 'entities/loan/types';

export const enrichBooks = (books: Book[], loans: Loan[]): BookEnriched[] => {
    const activeLoansByBookId = new Map<number, Loan>();
    loans.forEach(loan => {
        if (!loan.returnDate) {
            activeLoansByBookId.set(loan.bookId, loan);
        }
    });

    return books.map(book => {
        const loan = activeLoansByBookId.get(book.id);
        return {
            ...book,
            isLoaned: !!loan,
            loanId: loan ? loan.id : '',
        };
    });
};
