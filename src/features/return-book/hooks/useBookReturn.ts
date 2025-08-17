import { useState } from 'react';

import { BookEnriched } from 'entities/book/types';
import { ReaderEnriched } from 'entities/reader/types';

import { useAppDispatch } from 'shared/store/hooks';
import { returnBook } from 'entities/loan/redux/thunks';

export function useBookReturn(initialReader: ReaderEnriched) {
    const dispatch = useAppDispatch();
    const [currentLoans, setCurrentLoans] = useState<BookEnriched[]>(
        initialReader.currentLoans || []
    );

    const confirmReturnBook = async (loanId: string) => {
        try {
            await dispatch(returnBook({ loanId })).unwrap();
            setCurrentLoans(prev => prev.filter(b => b.loanId !== loanId));
        } catch (error) {
            console.error('Failed to return loan:', error);
        }
    };

    return { confirmReturnBook, currentLoans };
}
