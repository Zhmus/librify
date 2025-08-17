import { LoanEnriched } from 'entities/loan/types';
import { useLoansFilters } from 'features/browse-loans/hooks/useLoansFilters';
import { useListController } from 'shared/hooks/lists/useListController';

export const useLoansController = (loans: LoanEnriched[]) => {
    const { filtersState, resultItems: filteredItems } = useLoansFilters(loans);

    const { resultItems, listState } = useListController<LoanEnriched, typeof filtersState>(
        filteredItems,
        filtersState
    );

    return {
        listState,
        resultItems,
    };
};
