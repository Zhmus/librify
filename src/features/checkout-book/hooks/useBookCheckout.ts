import { useDispatch } from 'react-redux';
import type { AppDispatch } from 'app/store';

import { createLoan } from 'entities/loan/factory';
import { checkoutBook as createLoanThunk } from 'entities/loan/redux/thunks';

export const useBookCheckout = (bookId: number) => {
    const dispatch = useDispatch<AppDispatch>();

    const confirmCheckout = async (userId: number) => {
        const loan = createLoan(bookId, userId);
        try {
            await dispatch(createLoanThunk(loan)).unwrap();
            return true;
        } catch (error) {
            console.error('Failed to add loan', error);
            return false;
        }
    };

    return { confirmCheckout };
};
