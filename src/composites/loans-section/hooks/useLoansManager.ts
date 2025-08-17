import { useLoansData } from 'composites/loans-section/hooks/useLoansData';
import { useLoansController } from 'features/browse-loans/hooks/useLoansController';

export function useLoansManager() {
    const { enrichedLoans, loading, error } = useLoansData();
    const { listState, resultItems } = useLoansController(enrichedLoans);

    return {
        loadStatus: { loading, error },
        list: { states: listState, items: resultItems },
    };
}
