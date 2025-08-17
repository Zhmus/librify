import { v4 as uuidv4 } from 'uuid';
import { Loan } from './model';

export function createLoan(bookId: number, userId: number): Loan {
    const loan = new Loan();
    loan.id = uuidv4();
    loan.bookId = bookId;
    loan.userId = userId;
    loan.loanDate = new Date().toISOString().slice(0, 10);
    loan.returnDate = null;

    return loan;
}

export function returnLoan(loanId: string): Loan {
    const loan = new Loan();
    loan.id = loanId;
    loan.returnDate = new Date().toISOString();
    return loan;
}
