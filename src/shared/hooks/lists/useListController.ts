import { useSorting, SortingState } from './useSorting';
import { usePagination, PaginationState } from './usePagination';

export type ListControllerState<Entity, FilterState> = {
    resultItems: Entity[];
    listState: {
        filtersState: FilterState;
        sortingState: SortingState<Entity>;
        paginationState: PaginationState;
    };
};

export function useListController<Entity, FilterState>(
    filteredItems: Entity[],
    filtersState: FilterState,
    limit = 20
): ListControllerState<Entity, FilterState> {
    const { sortingState, resultItems: paginationItems } = useSorting(filteredItems);
    const { paginationState, resultItems } = usePagination(paginationItems, limit);

    return {
        resultItems,
        listState: {
            filtersState,
            sortingState,
            paginationState,
        },
    };
}
