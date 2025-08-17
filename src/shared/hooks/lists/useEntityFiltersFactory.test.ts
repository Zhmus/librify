import { renderHook, act } from '@testing-library/react';
import { useBooksFilters } from 'features/browse-books/hooks/useBooksFilters';
import { mockBooksEnriched } from 'entities/book/mock.mock';

test('filters items by title substring', () => {
    const { result } = renderHook(() => useBooksFilters(mockBooksEnriched));

    act(() => {
        result.current.filtersState.setUiFilters(prev => ({ ...prev, title: 'control' }));
    });

    expect(result.current.resultItems).toHaveLength(1);
    expect(result.current.resultItems[0].title).toBe('Court control');
});

test('filters out loaned books when hideLoaned is true', () => {
    const { result } = renderHook(() => useBooksFilters(mockBooksEnriched));

    act(() => {
        result.current.filtersState.setUiFilters(prev => ({ ...prev, hideLoaned: true }));
    });

    expect(result.current.resultItems).toHaveLength(1);
    expect(result.current.resultItems.every(b => !b.isLoaned)).toBe(true);
});
