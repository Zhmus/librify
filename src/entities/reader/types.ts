export interface RawReader {
    id: number;
    name: string;
    email: string;
    registered_at: string;
}

export interface Reader {
    id: number;
    name: string;
    email: string;
    registeredAt: Date;
}

import { BookEnriched } from '../book/types';

export interface ReaderEnriched extends Reader {
    currentLoans: BookEnriched[];
    loanHistory: BookEnriched[];
    hasCurrentLoan: boolean;
}
