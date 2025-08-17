import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BooksList from './BooksList';

import { BookEnriched } from 'entities/book/types';
import { mockBooksEnriched } from 'entities/book/mock.mock';
import { SortingState } from 'shared/hooks/lists/useSorting';
import { PaginationState } from 'shared/hooks/lists/usePagination';

describe('BooksList', () => {
    const books = mockBooksEnriched;

    const sortingState: SortingState<BookEnriched> = {
        requestSort: jest.fn(),
        sortField: 'title',
        sortDirection: 'asc',
        setSorting: jest.fn(),
    };

    const paginationState: PaginationState = {
        hasMore: true,
        loadMore: jest.fn(),
        loadingMore: false,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders a table with the correct number of rows', () => {
        render(
            <BooksList
                books={books}
                sortingState={sortingState}
                paginationState={paginationState}
            />
        );
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(books.length + 1);
    });

    it('calls requestSort when a header is clicked', () => {
        render(
            <BooksList
                books={books}
                sortingState={sortingState}
                paginationState={paginationState}
            />
        );
        const titleHeader = screen.getByText(/Title/);
        fireEvent.click(titleHeader);
        expect(sortingState.requestSort).toHaveBeenCalledWith('title');
    });

    it('displays an up arrow next to the sorted column when direction is asc', () => {
        render(
            <BooksList
                books={books}
                sortingState={sortingState}
                paginationState={paginationState}
            />
        );
        const titleHeader = screen.getByText(/Title/);
        expect(titleHeader).toHaveTextContent('Title ↑');
    });

    it('adds a bg-danger-subtle class to loaned books', () => {
        render(
            <BooksList
                books={books}
                sortingState={sortingState}
                paginationState={paginationState}
            />
        );
        const loanedBook = books.find(book => book.isLoaned);
        const loanedRow = screen.getByText(loanedBook!.title).closest('tr');
        expect(loanedRow).toHaveClass('bg-primary-subtle');
    });

    it('renders LoadMoreButton if hasMore is true', () => {
        render(
            <BooksList
                books={books}
                sortingState={sortingState}
                paginationState={paginationState}
            />
        );
        expect(screen.getByRole('button', { name: /load more/i })).toBeInTheDocument();
    });

    it('calls loadMore when LoadMoreButton is clicked', () => {
        render(
            <BooksList
                books={books}
                sortingState={sortingState}
                paginationState={paginationState}
            />
        );
        const loadMoreButton = screen.getByRole('button', { name: /load more/i });
        fireEvent.click(loadMoreButton);
        expect(paginationState.loadMore).toHaveBeenCalled();
    });
});
