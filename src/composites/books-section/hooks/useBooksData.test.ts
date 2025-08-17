import { renderHook } from '@testing-library/react';
import * as reactRedux from 'react-redux';

import { enrichBooks } from 'entities/book/enrich';
import { useBooksData } from './useBooksData';

import { mockBooksEnriched, mockTransformedBooks } from 'entities/book/mock.mock';
import { mockTransformedLoans } from 'entities/loan/mock.mock';

jest.mock('react-redux');
jest.mock('entities/book/enrich');

describe('useBooksData hook', () => {
    const dispatchMock = jest.fn();
    const useDispatchMock = reactRedux.useDispatch as unknown as jest.Mock;
    const useSelectorMock = reactRedux.useSelector as unknown as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();

        useDispatchMock.mockReturnValue(dispatchMock);

        useSelectorMock.mockImplementation(selector => {
            const fakeState = {
                books: { items: mockTransformedBooks, loading: false, error: null },
                loans: { items: mockTransformedLoans, loading: false, error: null },
            };
            return selector(fakeState);
        });

        (enrichBooks as jest.Mock).mockReturnValue(mockBooksEnriched);
    });

    it('returns enriched books with loading and error flags', () => {
        const { result } = renderHook(() => useBooksData());

        expect(result.current.enrichedBooks).toEqual(mockBooksEnriched);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('dispatches loadBooks and loadLoans when state is empty', () => {
        useSelectorMock.mockImplementation(selector => {
            const emptyState = {
                books: { items: [], loading: false, error: null },
                loans: { items: [], loading: false, error: null },
            };
            return selector(emptyState);
        });

        renderHook(() => useBooksData());

        expect(dispatchMock).toHaveBeenCalledTimes(2);
    });
});
