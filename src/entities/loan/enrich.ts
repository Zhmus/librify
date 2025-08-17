import { Loan, LoanEnriched } from './types';
import { Reader } from 'entities/reader/types';
import { Book } from 'entities/book/types';

export const enrichLoans = (loans: Loan[], readers: Reader[], books: Book[]): LoanEnriched[] => {
    const readersById = new Map<number, Reader>();
    readers.forEach(reader => readersById.set(reader.id, reader));

    const booksById = new Map<number, Book>();
    books.forEach(book => booksById.set(book.id, book));

    return loans.map(loan => {
        const reader = readersById.get(loan.userId);
        const book = booksById.get(loan.bookId);

        return {
            ...loan,
            isLoaned: !loan.returnDate,
            userName: reader ? reader.name : 'Unknown',
            bookTitle: book ? book.title : 'Unknown',
            bookAuthor: book ? book.author : 'Unknown',
        };
    });
};
