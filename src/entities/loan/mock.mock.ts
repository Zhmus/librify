import { RawLoan } from './types';
import { Loan } from './model';

export const mockRawLoans: RawLoan[] = [
    { id: '1', book_id: 2, user_id: 1, loan_date: '2025-04-10', return_date: null },
    { id: '2', book_id: 3, user_id: 2, loan_date: '2025-05-01', return_date: null },
    { id: '3', book_id: 1, user_id: 3, loan_date: '2025-03-01', return_date: '2025-04-01' },
];

export const mockTransformedLoans: Loan[] = mockRawLoans.map(l =>
    Object.assign(new Loan(), {
        id: l.id,
        bookId: l.book_id,
        userId: l.user_id,
        loanDate: l.loan_date,
        returnDate: l.return_date,
    })
);

export const mockSingleActiveLoan: Loan = Object.assign(new Loan(), {
    id: '2',
    bookId: 3,
    userId: 2,
    loanDate: '2025-05-01',
    returnDate: null,
});
