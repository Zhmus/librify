import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Book } from 'entities/book/types';
import { Reader } from 'entities/reader/types';
import { Loan } from 'entities/loan/model';

import { RootState, AppDispatch } from 'app/store';
import { loadReaders } from 'entities/reader/redux/thunks';
import { loadBooks } from 'entities/book/redux/thunks';
import { loadLoans } from 'entities/loan/redux/thunks';

export const useStatsData = (): {
    data: {
        books: Book[];
        readers: Reader[];
        loans: Loan[];
    };
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
        if (!books.length) dispatch(loadBooks());
        if (!readers.length) dispatch(loadReaders());
        if (!loans.length) dispatch(loadLoans());
    }, [books.length, readers.length, loans.length, dispatch]);

    const data = { books, readers, loans };

    return { data, loading, error };
};
