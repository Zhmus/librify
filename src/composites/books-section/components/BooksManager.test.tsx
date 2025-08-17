import React from 'react';
import { render, screen } from '@testing-library/react';

import BooksManager from './BooksManager';
import { useBooksManager } from '../hooks/useBooksManager';

import { mockBooksEnriched } from 'entities/book/mock.mock';

jest.mock('../hooks/useBooksManager');
jest.mock('features/browse-books/components/BooksFilters', () => () => (
    <div data-testid="books-filters" />
));
jest.mock('features/browse-books/components/BooksList', () => () => (
    <div data-testid="books-list" />
));
jest.mock('features/checkout-book/components/BookCheckoutModal', () => () => (
    <div data-testid="checkout-modal" />
));

describe('BooksManager component', () => {
    beforeEach(() => jest.clearAllMocks());

    it('renders filters and list', () => {
        (useBooksManager as jest.Mock).mockReturnValue({
            loadStatus: { loading: false, error: null },
            list: {
                uiState: { filtersState: {}, sortingState: {}, paginationState: {} },
                displayItems: mockBooksEnriched,
                categories: { genres: ['Programming'] },
            },
            bookCheckoutModal: {
                selectedBookId: null,
                openModal: jest.fn(),
                closeModal: jest.fn(),
            },
        });

        render(<BooksManager />);

        expect(screen.getByTestId('books-filters')).toBeInTheDocument();
        expect(screen.getByTestId('books-list')).toBeInTheDocument();
        expect(screen.queryByTestId('checkout-modal')).not.toBeInTheDocument();
    });

    it('renders checkout modal when book selected', () => {
        (useBooksManager as jest.Mock).mockReturnValue({
            loadStatus: { loading: false, error: null },
            list: {
                uiState: { filtersState: {}, sortingState: {}, paginationState: {} },
                displayItems: mockBooksEnriched,
                categories: { genres: ['Programming'] },
            },
            bookCheckoutModal: {
                selectedBookId: 1,
                openModal: jest.fn(),
                closeModal: jest.fn(),
            },
        });

        render(<BooksManager />);
        expect(screen.getByTestId('checkout-modal')).toBeInTheDocument();
    });
});
