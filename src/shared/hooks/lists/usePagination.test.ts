import { renderHook, act } from '@testing-library/react';
import { usePagination } from './usePagination';

beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
});

describe('usePagination', () => {
    const initialItems = Array.from({ length: 50 }, (_, i) => i + 1);

    it('returns first page of items based on limit', () => {
        const { result } = renderHook(() => usePagination(initialItems, 10));
        expect(result.current.resultItems).toEqual(initialItems.slice(0, 10));
        expect(result.current.paginationState.hasMore).toBe(true);
    });

    it('loads more items on loadMore', () => {
        const { result } = renderHook(() => usePagination(initialItems, 10));

        act(() => {
            result.current.paginationState.loadMore();
        });

        expect(result.current.paginationState.loadingMore).toBe(true);

        act(() => {
            jest.advanceTimersByTime(300);
        });

        expect(result.current.resultItems).toEqual(initialItems.slice(0, 20));
        expect(result.current.paginationState.loadingMore).toBe(false);
    });

    it('handles hasMore=false when all items loaded', () => {
        const { result } = renderHook(() => usePagination(initialItems, 50));

        act(() => {
            result.current.paginationState.loadMore();
            jest.advanceTimersByTime(300);
        });

        expect(result.current.resultItems).toEqual(initialItems);
        expect(result.current.paginationState.hasMore).toBe(false);
    });

    it('responds to changes in input items array', () => {
        const { result, rerender } = renderHook(({ items }) => usePagination(items, 10), {
            initialProps: { items: initialItems },
        });

        expect(result.current.resultItems).toEqual(initialItems.slice(0, 10));

        act(() => {
            result.current.paginationState.loadMore();
            jest.advanceTimersByTime(300);
        });

        expect(result.current.resultItems).toEqual(initialItems.slice(0, 20));

        const newItems = Array.from({ length: 30 }, (_, i) => i + 101);

        rerender({ items: newItems });

        expect(result.current.resultItems).toEqual(newItems.slice(0, 10));
        expect(result.current.paginationState.hasMore).toBe(true);
    });
});
