import { ReaderEnriched } from 'entities/reader/types';
import { useReadersFilters } from 'features/browse-readers/hooks/useReadersFilters';
import { useListController } from 'shared/hooks/lists/useListController';

export const useReadersController = (readers: ReaderEnriched[]) => {
    const { filtersState, resultItems: filteredItems } = useReadersFilters(readers);

    const { resultItems, listState } = useListController<ReaderEnriched, typeof filtersState>(
        filteredItems,
        filtersState
    );

    return {
        listState: listState,
        resultItems,
    };
};
