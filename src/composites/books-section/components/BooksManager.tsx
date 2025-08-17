import React from 'react';

import { useBooksManager } from '../hooks/useBooksManager';

import AsyncWrapper from 'shared/ui/AsyncWrapper';
import BooksFilters from 'features/browse-books/components/BooksFilters';
import BooksList from 'features/browse-books/components/BooksList';

import BookCheckoutModal from 'features/checkout-book/components/BookCheckoutModal';

const BooksManager = () => {
    const { loadStatus, list, bookCheckoutModal } = useBooksManager();

    return (
        <AsyncWrapper loading={loadStatus.loading} error={loadStatus.error}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <BooksFilters
                    filtersState={list.uiState.filtersState}
                    genres={list.categories.genres}
                />
            </div>
            <BooksList
                books={list.displayItems}
                sortingState={list.uiState.sortingState}
                paginationState={list.uiState.paginationState}
                actions={{ onLoan: bookCheckoutModal.openModal }}
            />
            {bookCheckoutModal.selectedBookId !== null && (
                <BookCheckoutModal
                    bookId={bookCheckoutModal.selectedBookId}
                    onClose={bookCheckoutModal.closeModal}
                />
            )}
        </AsyncWrapper>
    );
};

export default BooksManager;
