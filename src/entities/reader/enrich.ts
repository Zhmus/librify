import { Reader, ReaderEnriched } from './types';
import { Book, BookEnriched } from 'entities/book/types';
import { Loan } from 'entities/loan/types';

import { enrichBooks } from 'entities/book/enrich';

export const enrichReaders = (
    readers: Reader[],
    books: Book[],
    loans: Loan[]
): ReaderEnriched[] => {
    const enrichedBooks = enrichBooks(books, loans);
    const booksById = new Map(enrichedBooks.map(b => [b.id, b]));

    const loansByUserId = new Map<number, Loan[]>();
    loans.forEach(l => {
        if (!loansByUserId.has(l.userId)) loansByUserId.set(l.userId, []);
        loansByUserId.get(l.userId)!.push(l);
    });

    return readers.map(reader => {
        const userLoans = loansByUserId.get(reader.id) || [];

        const currentLoans: BookEnriched[] = userLoans
            .filter(l => !l.returnDate)
            .map(l => {
                const book = booksById.get(l.bookId);
                return book ? { ...book, loanId: l.id } : null;
            })
            .filter((b): b is BookEnriched => !!b);

        const loanHistory: BookEnriched[] = Array.from(new Set(userLoans.map(l => l.bookId)))
            .map(bookId => {
                const book = booksById.get(bookId);
                return book
                    ? { ...book, isLoaned: currentLoans.some(cl => cl.id === bookId) }
                    : null;
            })
            .filter((b): b is BookEnriched => !!b);

        return {
            ...reader,
            currentLoans,
            loanHistory,
            hasCurrentLoan: currentLoans.length > 0,
        };
    });
};
