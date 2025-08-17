import React, { FC } from 'react';

import { useLoansManager } from '../hooks/useLoansManager';

import AsyncWrapper from 'shared/ui/AsyncWrapper';
import LoansFilters from 'features/browse-loans/components/LoansFilters';
import LoansList from 'features/browse-loans/components/LoansList';

const LoansManager: FC = () => {
    const { loadStatus, list } = useLoansManager();

    const { filtersState, sortingState, paginationState } = list.states;
    const items = list.items;

    return (
        <AsyncWrapper loading={loadStatus.loading} error={loadStatus.error}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <LoansFilters filtersState={filtersState} />
            </div>
            <LoansList
                loans={items}
                sortingState={sortingState}
                paginationState={paginationState}
            />
        </AsyncWrapper>
    );
};

export default LoansManager;
