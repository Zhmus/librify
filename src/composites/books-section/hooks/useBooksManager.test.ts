import { renderHook } from '@testing-library/react';

import { useBooksManager } from './useBooksManager';
import { useBooksData } from 'composites/books-section/hooks/useBooksData';
import { useBooksController } from 'features/browse-books/hooks/useBooksController';
import { useBookCheckoutModal } from 'features/checkout-book/hooks/useBookCheckoutModal';

import { mockBooksEnriched } from 'entities/book/mock.mock';

jest.mock('features/browse-books/hooks/useBooksController');
jest.mock('features/checkout-book/hooks/useBookCheckoutModal');
jest.mock('composites/books-section/hooks/useBooksData');

describe('useBooksManager', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        (useBooksData as jest.Mock).mockReturnValue({
            enrichedBooks: mockBooksEnriched,
            loading: false,
            error: null,
        });

        (useBooksController as jest.Mock).mockReturnValue({
            categories: { genres: ['Programming', 'Non-fiction'] },
            listState: { filtersState: {}, sortingState: {}, paginationState: {} },
            resultItems: mockBooksEnriched,
        });

        (useBookCheckoutModal as jest.Mock).mockReturnValue({
            selectedBookId: null,
            openModal: jest.fn(),
            closeModal: jest.fn(),
        });
    });

    it('returns correct structure', () => {
        const { result } = renderHook(() => useBooksManager());

        expect(result.current).toEqual({
            loadStatus: { loading: false, error: null },
            list: {
                uiState: { filtersState: {}, sortingState: {}, paginationState: {} },
                displayItems: mockBooksEnriched,
                categories: { genres: ['Programming', 'Non-fiction'] },
            },
            bookCheckoutModal: {
                selectedBookId: null,
                openModal: expect.any(Function),
                closeModal: expect.any(Function),
            },
        });
    });

    it('calls useLoansController with enrichedBooks from useBooksData', () => {
        renderHook(() => useBooksManager());
        expect(useBooksController).toHaveBeenCalledWith(mockBooksEnriched);
    });

    it('openModal can be called', () => {
        const mockOpen = jest.fn();
        (useBookCheckoutModal as jest.Mock).mockReturnValue({
            selectedBookId: null,
            openModal: mockOpen,
            closeModal: jest.fn(),
        });

        const { result } = renderHook(() => useBooksManager());
        result.current.bookCheckoutModal.openModal(1);

        expect(mockOpen).toHaveBeenCalledWith(1);
    });
});
