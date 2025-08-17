import { Expose } from 'class-transformer';

export class Loan {
    @Expose({ name: 'id' })
    id!: string;

    @Expose({ name: 'book_id' })
    bookId!: number;

    @Expose({ name: 'user_id' })
    userId!: number;

    @Expose({ name: 'loan_date' })
    loanDate!: string;

    @Expose({ name: 'return_date' })
    returnDate?: string | null;
}
