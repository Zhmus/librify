import { renderHook, act } from '@testing-library/react';
import { useReadersFilters } from './useReadersFilters';

import { mockTransformedReaders } from 'entities/reader/mock.mock';

describe('useReadersFilters', () => {
    it('should return all readers initially', () => {
        const { result } = renderHook(() => useReadersFilters(mockTransformedReaders));

        expect(result.current.resultItems).toHaveLength(3);
        expect(result.current.filtersState.uiFilters).toEqual({ name: '' });
    });

    it('should filter readers by name substring', () => {
        const { result } = renderHook(() => useReadersFilters(mockTransformedReaders));

        act(() => {
            result.current.filtersState.setUiFilters({
                ...result.current.filtersState.uiFilters,
                name: 'Jane',
            });
        });

        expect(result.current.resultItems).toEqual([mockTransformedReaders[2]]);
    });

    it('should return empty array if no match found', () => {
        const { result } = renderHook(() => useReadersFilters(mockTransformedReaders));

        act(() => {
            result.current.filtersState.setUiFilters({
                ...result.current.filtersState.uiFilters,
                name: 'NotExist',
            });
        });

        expect(result.current.resultItems).toHaveLength(0);
    });
});
