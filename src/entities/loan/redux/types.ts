import { Loan } from '../model';

export type LoanState = {
    items: Loan[];
    loading: boolean;
    error: Error | null;
};
