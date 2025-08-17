import { renderHook } from '@testing-library/react';
import { useListController } from './useListController';

jest.mock('./usePagination', () => ({
    usePagination: jest.fn(),
}));

jest.mock('./useSorting', () => ({
    useSorting: jest.fn(),
}));

import { usePagination } from './usePagination';
import { useSorting } from './useSorting';

describe('useListController', () => {
    const dummyItems = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const mockSortedItems = [{ id: 1 }, { id: 2 }];
    const mockPaginatedItems = [{ id: 1 }];
    const mockFiltersState = { filter: true };

    const mockSortingState = {
        sortField: 'id',
        sortDirection: 'asc',
        requestSort: jest.fn(),
    };

    const mockPaginationState = {
        hasMore: false,
        loadingMore: false,
        loadMore: jest.fn(),
    };

    beforeEach(() => {
        (useSorting as jest.Mock).mockReturnValue({
            resultItems: mockSortedItems,
            sortingState: mockSortingState,
        });

        (usePagination as jest.Mock).mockReturnValue({
            resultItems: mockPaginatedItems,
            paginationState: mockPaginationState,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('returns correct resultItems and listState', () => {
        const { result } = renderHook(() => useListController(dummyItems, mockFiltersState, 10));

        expect(useSorting).toHaveBeenCalledWith(dummyItems);
        expect(usePagination).toHaveBeenCalledWith(mockSortedItems, 10);

        expect(result.current.resultItems).toEqual(mockPaginatedItems);

        expect(result.current.listState.filtersState).toEqual(mockFiltersState);
        expect(result.current.listState.sortingState).toEqual(mockSortingState);
        expect(result.current.listState.paginationState).toEqual(mockPaginationState);
    });
});
