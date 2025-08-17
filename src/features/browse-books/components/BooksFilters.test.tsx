import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import BooksFilters from './BooksFilters';
import { BookUiFilters } from '../hooks/useBooksFilters';

describe('BooksFilters', () => {
    const genres = ['Fiction', 'Fantasy', 'History'];
    const filters: BookUiFilters = {
        title: '',
        author: '',
        genre: '',
        hideLoaned: false,
    };

    const setup = (overrideFilters = filters, setUiFilters = jest.fn()) => {
        render(
            <BooksFilters
                filtersState={{ uiFilters: overrideFilters, setUiFilters }}
                genres={genres}
            />
        );
        return { setUiFilters };
    };

    it('renders all form fields correctly', () => {
        setup();
        expect(screen.getByPlaceholderText(/search by title/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/search by author/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/hide loaned books/i)).toBeInTheDocument();
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('calls setUiFilters when typing in the title field', () => {
        const { setUiFilters } = setup();
        const input = screen.getByPlaceholderText(/search by title/i);
        fireEvent.change(input, { target: { value: 'Harry Potter' } });
        expect(setUiFilters).toHaveBeenCalledWith(
            expect.objectContaining({ title: 'Harry Potter' })
        );
    });

    it('calls setUiFilters when typing in the author field', () => {
        const { setUiFilters } = setup();
        const input = screen.getByPlaceholderText(/search by author/i);
        fireEvent.change(input, { target: { value: 'Rowling' } });
        expect(setUiFilters).toHaveBeenCalledWith(expect.objectContaining({ author: 'Rowling' }));
    });

    it('calls setUiFilters when selecting a genre', () => {
        const { setUiFilters } = setup();
        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: 'Fiction' } });
        expect(setUiFilters).toHaveBeenCalledWith(expect.objectContaining({ genre: 'Fiction' }));
    });

    it('calls setUiFilters when toggling hideLoaned checkbox', () => {
        const { setUiFilters } = setup();
        const checkbox = screen.getByLabelText(/hide loaned books/i);
        fireEvent.click(checkbox);
        expect(setUiFilters).toHaveBeenCalledWith(expect.objectContaining({ hideLoaned: true }));
    });
});
