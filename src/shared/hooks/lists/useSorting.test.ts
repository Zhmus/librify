import { renderHook, act } from '@testing-library/react';
import { useSorting } from './useSorting';

type Item = {
    id: number;
    name: string;
    active: boolean;
};

const data: Item[] = [
    { id: 3, name: 'Charlie', active: false },
    { id: 1, name: 'Alice', active: true },
    { id: 2, name: 'Bob', active: false },
];

describe('hooks/useSorting', () => {
    it('sorts by defaultSortField on initial render (numeric)', () => {
        const { result } = renderHook(() => useSorting(data, 'id'));
        expect(result.current.resultItems.map(i => i.id)).toEqual([1, 2, 3]);
        expect(result.current.sortingState.sortField).toBe('id');
        expect(result.current.sortingState.sortDirection).toBe('asc');
    });

    it('toggles sort direction when clicking the same field again', () => {
        const { result } = renderHook(() => useSorting(data, 'id'));

        act(() => {
            result.current.sortingState.requestSort('id');
        });

        expect(result.current.sortingState.sortDirection).toBe('desc');
        expect(result.current.resultItems.map(i => i.id)).toEqual([3, 2, 1]);
    });

    it('sorts string fields in asc then desc', () => {
        const { result } = renderHook(() => useSorting(data));
        act(() => {
            result.current.sortingState.requestSort('name');
        });

        expect(result.current.sortingState.sortField).toBe('name');
        expect(result.current.sortingState.sortDirection).toBe('asc');
        expect(result.current.resultItems.map(i => i.name)).toEqual(['Alice', 'Bob', 'Charlie']);

        act(() => {
            result.current.sortingState.requestSort('name');
        });

        expect(result.current.sortingState.sortDirection).toBe('desc');
        expect(result.current.resultItems.map(i => i.name)).toEqual(['Charlie', 'Bob', 'Alice']);
    });

    it('resets direction to asc when switching sort field', () => {
        const { result } = renderHook(() => useSorting(data, 'id'));

        act(() => {
            result.current.sortingState.requestSort('id');
            result.current.sortingState.requestSort('name');
        });

        expect(result.current.sortingState.sortField).toBe('name');
        expect(result.current.sortingState.sortDirection).toBe('asc');
        expect(result.current.resultItems.map(i => i.name)).toEqual(['Alice', 'Bob', 'Charlie']);
    });

    it('sorts boolean fields correctly', () => {
        const { result } = renderHook(() => useSorting(data));

        act(() => {
            result.current.sortingState.requestSort('active');
        });

        expect(result.current.resultItems.map(i => i.active)).toEqual([false, false, true]);

        act(() => {
            result.current.sortingState.requestSort('active');
        });

        expect(result.current.resultItems.map(i => i.active)).toEqual([true, false, false]);
    });

    it('does nothing if sortField is null', () => {
        const { result } = renderHook(() => useSorting(data));

        expect(result.current.resultItems).toEqual(data);
    });
});
