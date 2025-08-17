import React from 'react';

import { useReadersManager } from '../hooks/useReadersManager';

import AsyncWrapper from 'shared/ui/AsyncWrapper';
import ReadersFilters from 'features/browse-readers/components/ReadersFilters';
import ReadersList from 'features/browse-readers/components/ReadersList';

import ReaderInfoModal from 'features/reader-info/components/ReaderInfoModal';
import BookReturnModal from 'features/return-book/components/BookReturnModal';
import AddReaderModal from 'features/add-reader/components/AddReaderModal';
import AddReaderButton from 'features/add-reader/components/AddReaderButton';

const ReadersManager: React.FC = () => {
    const { loadStatus, list, bookReturnModal, readerInfoModal, addReaderModal } =
        useReadersManager();

    const { filtersState, sortingState, paginationState } = list.states;
    const items = list.items;

    return (
        <AsyncWrapper loading={loadStatus.loading} error={loadStatus.error}>
            <div className="d-md-flex justify-content-between align-items-center mb-3">
                <ReadersFilters filtersState={filtersState} />
                <AddReaderButton onClick={addReaderModal.openModal} />
            </div>

            <ReadersList
                readers={items}
                sortingState={sortingState}
                paginationState={paginationState}
                actions={{
                    onShowInfo: readerInfoModal.openModal,
                    onReturnBook: bookReturnModal.openModal,
                }}
            />

            {readerInfoModal.selectedReader && (
                <ReaderInfoModal
                    reader={readerInfoModal.selectedReader}
                    onClose={readerInfoModal.closeModal}
                />
            )}

            {bookReturnModal.selectedReader && (
                <BookReturnModal
                    reader={bookReturnModal.selectedReader}
                    onClose={bookReturnModal.closeModal}
                />
            )}

            {addReaderModal.isOpen && (
                <AddReaderModal
                    onClose={addReaderModal.closeModal}
                    onSubmit={addReaderModal.submitModal}
                />
            )}
        </AsyncWrapper>
    );
};

export default ReadersManager;
