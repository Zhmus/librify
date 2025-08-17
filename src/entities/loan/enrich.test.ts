import { enrichLoans } from './enrich';
import { Loan, LoanEnriched } from './types';
import { Reader } from 'entities/reader/types';
import { Book } from 'entities/book/types';

describe('enrichLoans', () => {
    const readers: Reader[] = [
        { id: 1, name: 'Alice', email: 'alice@example.com', registeredAt: new Date() },
        { id: 2, name: 'Bob', email: 'bob@example.com', registeredAt: new Date() },
    ];

    const books: Book[] = [
        { id: 1, title: 'Book One', author: 'Author A', genre: 'Fiction', publishedYear: 2020 },
        { id: 2, title: 'Book Two', author: 'Author B', genre: 'Non-Fiction', publishedYear: 2021 },
    ];

    const loans: Loan[] = [
        { id: 'l1', bookId: 1, userId: 1, loanDate: '2025-01-01' },
        { id: 'l2', bookId: 2, userId: 2, loanDate: '2025-02-01', returnDate: '2025-03-01' },
        { id: 'l3', bookId: 3, userId: 3, loanDate: '2025-03-01' },
    ];

    it('enriches loans with reader name, book title, author and isLoaned', () => {
        const enriched: LoanEnriched[] = enrichLoans(loans, readers, books);

        expect(enriched).toHaveLength(3);

        expect(enriched[0]).toEqual({
            ...loans[0],
            isLoaned: true,
            userName: 'Alice',
            bookTitle: 'Book One',
            bookAuthor: 'Author A',
        });

        expect(enriched[1]).toEqual({
            ...loans[1],
            isLoaned: false,
            userName: 'Bob',
            bookTitle: 'Book Two',
            bookAuthor: 'Author B',
        });

        expect(enriched[2]).toEqual({
            ...loans[2],
            isLoaned: true,
            userName: 'Unknown',
            bookTitle: 'Unknown',
            bookAuthor: 'Unknown',
        });
    });
});
