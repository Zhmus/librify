import React, { FC } from 'react';

import { LoanEnriched } from 'entities/loan/types';
import { SortingState } from 'shared/hooks/lists/useSorting';
import { PaginationState } from 'shared/hooks/lists/usePagination';

import LoansItem from './LoansItem';
import LoadMoreButton from 'shared/ui/LoadMoreButton';

export interface LoansListProps {
    loans: LoanEnriched[];
    sortingState: SortingState<LoanEnriched>;
    paginationState: PaginationState;
}

const LoansList: FC<LoansListProps> = ({ loans, sortingState, paginationState }) => {
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
                        <th onClick={() => requestSort('userName')} style={{ cursor: 'pointer' }}>
                            Reader{' '}
                            {sortField === 'userName' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => requestSort('bookAuthor')} style={{ cursor: 'pointer' }}>
                            Author{' '}
                            {sortField === 'bookAuthor' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => requestSort('bookTitle')} style={{ cursor: 'pointer' }}>
                            Book{' '}
                            {sortField === 'bookTitle' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            className="text-center"
                            onClick={() => requestSort('loanDate')}
                            style={{ cursor: 'pointer' }}
                        >
                            Checkout Date{' '}
                            {sortField === 'loanDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            className="text-center"
                            onClick={() => requestSort('returnDate')}
                            style={{ cursor: 'pointer' }}
                        >
                            Return Date{' '}
                            {sortField === 'returnDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            className="text-end"
                            onClick={() => requestSort('isLoaned')}
                            style={{ cursor: 'pointer' }}
                        >
                            Current Loan{' '}
                            {sortField === 'isLoaned' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map((loan, index) => (
                        <tr key={loan.id} className={loan.isLoaned ? 'bg-info-subtle' : ''}>
                            <LoansItem index={index + 1} loan={loan} />
                        </tr>
                    ))}
                </tbody>
            </table>
            {hasMore && <LoadMoreButton onClick={loadMore} loading={loadingMore} />}
        </div>
    );
};

export default LoansList;
