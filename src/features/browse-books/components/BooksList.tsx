import React, { FC } from 'react';

import { BookEnriched } from 'entities/book/types';
import { SortingState } from 'shared/hooks/lists/useSorting';
import { PaginationState } from 'shared/hooks/lists/usePagination';

import BooksItem from './BooksItem';
import LoadMoreButton from 'shared/ui/LoadMoreButton';

export interface BooksListProps {
    books: BookEnriched[];
    sortingState: SortingState<BookEnriched>;
    paginationState: PaginationState;
    actions?: {
        onLoan?: (bookId: number) => void;
    };
}

const BooksList: FC<BooksListProps> = ({ books, sortingState, paginationState, actions }) => {
    const { requestSort, sortField, sortDirection } = sortingState;
    const { hasMore, loadMore, loadingMore } = paginationState;

    return (
        <div className="table-responsive mb-3">
            <table
                className="table"
                style={{ '--fn-table-bg': 'transparent' } as React.CSSProperties}
            >
                <thead>
                    <tr>
                        <th>#</th>
                        <th onClick={() => requestSort('title')} style={{ cursor: 'pointer' }}>
                            Title {sortField === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => requestSort('author')} style={{ cursor: 'pointer' }}>
                            Author {sortField === 'author' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th>Genre</th>
                        <th
                            className="text-center"
                            onClick={() => requestSort('isLoaned')}
                            style={{ cursor: 'pointer' }}
                        >
                            Status{' '}
                            {sortField === 'isLoaned' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id} className={book.isLoaned ? 'bg-primary-subtle' : ''}>
                            <BooksItem book={book} actions={actions} />
                        </tr>
                    ))}
                </tbody>
            </table>
            {hasMore && <LoadMoreButton onClick={loadMore} loading={loadingMore} />}
        </div>
    );
};

export default BooksList;
