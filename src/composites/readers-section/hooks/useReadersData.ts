import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ReaderEnriched } from 'entities/reader/types';
import { enrichReaders } from 'entities/reader/enrich';

import { RootState, AppDispatch } from 'app/store';
import { loadReaders } from 'entities/reader/redux/thunks';
import { loadBooks } from 'entities/book/redux/thunks';
import { loadLoans } from 'entities/loan/redux/thunks';

export const useReadersData = (): {
    enrichedReaders: ReaderEnriched[];
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
        if (!readers.length) dispatch(loadReaders());
        if (!books.length) dispatch(loadBooks());
        if (!loans.length) dispatch(loadLoans());
    }, [readers.length, books.length, loans.length, dispatch]);

    const enrichedReaders: ReaderEnriched[] = enrichReaders(readers, books, loans);

    return { enrichedReaders, loading, error };
};
