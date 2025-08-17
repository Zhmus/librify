import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BookEnriched } from 'entities/book/types';
import { enrichBooks } from 'entities/book/enrich';

import { RootState, AppDispatch } from 'app/store';
import { loadBooks } from 'entities/book/redux/thunks';
import { loadLoans } from 'entities/loan/redux/thunks';

export const useBooksData = (): {
    enrichedBooks: BookEnriched[];
    loading: boolean;
    error: Error | null;
} => {
    const dispatch = useDispatch<AppDispatch>();

    const { books, loans, loading, error } = useSelector((state: RootState) => ({
        books: state.books.items,
        loans: state.loans.items,
        loading: state.books.loading || state.loans.loading,
        error: state.books.error || state.loans.error,
    }));

    useEffect(() => {
        if (!books.length) dispatch(loadBooks());
        if (!loans.length) dispatch(loadLoans());
    }, [books.length, loans.length, dispatch]);

    const enrichedBooks: BookEnriched[] = enrichBooks(books, loans);

    return { enrichedBooks, loading, error };
};
