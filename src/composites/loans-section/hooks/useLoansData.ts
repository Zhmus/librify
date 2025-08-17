import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LoanEnriched } from 'entities/loan/types';
import { enrichLoans } from 'entities/loan/enrich';

import { RootState, AppDispatch } from 'app/store';
import { loadLoans } from 'entities/loan/redux/thunks';
import { loadReaders } from 'entities/reader/redux/thunks';
import { loadBooks } from 'entities/book/redux/thunks';

export const useLoansData = (): {
    enrichedLoans: LoanEnriched[];
    loading: boolean;
    error: Error | null;
} => {
    const dispatch = useDispatch<AppDispatch>();

    const { books, readers, loans, loading, error } = useSelector((state: RootState) => ({
        books: state.books.items,
        readers: state.readers.items,
        loans: state.loans.items,
        loading: state.books.loading || state.readers.loading || state.loans.loading,
        error: state.books.error || state.readers.error || state.loans.error,
    }));

    useEffect(() => {
        if (!loans.length) dispatch(loadLoans());
        if (!readers.length) dispatch(loadReaders());
        if (!books.length) dispatch(loadBooks());
    }, [readers.length, books.length, loans.length, dispatch]);

    const enrichedLoans: LoanEnriched[] = enrichLoans(loans, readers, books);

    return { enrichedLoans, loading, error };
};
