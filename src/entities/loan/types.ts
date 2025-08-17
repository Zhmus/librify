export interface RawLoan {
    id: string;
    book_id: number;
    user_id: number;
    loan_date: string;
    return_date?: string | null;
}

export interface Loan {
    id: string;
    bookId: number;
    userId: number;
    loanDate: string;
    returnDate?: string | null;
}

export interface LoanEnriched extends Loan {
    isLoaned: boolean;
    userName: string;
    bookAuthor: string;
    bookTitle: string;
}
