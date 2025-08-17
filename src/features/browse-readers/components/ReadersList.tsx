import React, { FC } from 'react';

import { ReaderEnriched } from 'entities/reader/types';
import { SortingState } from 'shared/hooks/lists/useSorting';
import { PaginationState } from 'shared/hooks/lists/usePagination';

import ReadersItem from 'features/browse-readers/components/ReadersItem';
import LoadMoreButton from 'shared/ui/LoadMoreButton';

export interface ReadersListProps {
    readers: ReaderEnriched[];
    sortingState: SortingState<ReaderEnriched>;
    paginationState: PaginationState;
    actions?: {
        onReturnBook?: (reader: ReaderEnriched) => void;
        onShowInfo?: (reader: ReaderEnriched) => void;
    };
}

const ReadersList: FC<ReadersListProps> = ({ readers, sortingState, paginationState, actions }) => {
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
                        <th onClick={() => requestSort('name')} style={{ cursor: 'pointer' }}>
                            Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => requestSort('email')} style={{ cursor: 'pointer' }}>
                            Email {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            className="text-center"
                            onClick={() => requestSort('registeredAt')}
                            style={{ cursor: 'pointer' }}
                        >
                            Registration date{' '}
                            {sortField === 'registeredAt' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {readers.map((reader, index) => (
                        <tr key={reader.id}>
                            <ReadersItem index={index + 1} reader={reader} actions={actions} />
                        </tr>
                    ))}
                </tbody>
            </table>
            {hasMore && <LoadMoreButton onClick={loadMore} loading={loadingMore} />}
        </div>
    );
};

export default ReadersList;
