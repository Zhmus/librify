import { renderHook } from '@testing-library/react';

import { useBooksController } from './useBooksController';
import { useCategories } from 'shared/hooks/lists/useCategories';
import { useBooksFilters } from 'features/browse-books/hooks/useBooksFilters';
import { useListController } from 'shared/hooks/lists/useListController';

import { mockBooksEnriched } from 'entities/book/mock.mock';

jest.mock('shared/hooks/lists/useCategories');
jest.mock('features/browse-books/hooks/useBooksFilters');
jest.mock('shared/hooks/lists/useListController');

describe('useBooksController', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        (useCategories as jest.Mock).mockReturnValue(['Programming', 'Non-fiction']);
        (useBooksFilters as jest.Mock).mockReturnValue({
            filtersState: {},
            resultItems: mockBooksEnriched,
        });
        (useListController as jest.Mock).mockReturnValue({
            resultItems: mockBooksEnriched,
            listState: { filtersState: {}, sortingState: {}, paginationState: {} },
        });
    });

    it('returns correct structure', () => {
        const { result } = renderHook(() => useBooksController(mockBooksEnriched));

        expect(result.current).toEqual({
            categories: { genres: ['Programming', 'Non-fiction'] },
            listState: { filtersState: {}, sortingState: {}, paginationState: {} },
            resultItems: mockBooksEnriched,
        });
    });
});
