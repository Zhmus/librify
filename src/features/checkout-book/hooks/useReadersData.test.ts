import { renderHook } from '@testing-library/react';
import * as reactRedux from 'react-redux';

import { useReadersData } from './useReadersData';
import { loadReaders } from 'entities/reader/redux/thunks';

import { mockTransformedReaders } from 'entities/reader/mock.mock';

jest.mock('react-redux');

jest.mock('entities/reader/redux/thunks', () => ({
    loadReaders: jest.fn(() => ({ type: 'loadReaders' })),
}));

describe('useReaders hook', () => {
    const dispatchMock = jest.fn();
    const useDispatchMock = reactRedux.useDispatch as unknown as jest.Mock;
    const useSelectorMock = reactRedux.useSelector as unknown as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
        useDispatchMock.mockReturnValue(dispatchMock);

        useSelectorMock.mockImplementation(selector => {
            const fakeState = {
                readers: { items: mockTransformedReaders, loading: false, error: null },
            };
            return selector(fakeState);
        });
    });

    it('returns readers, loading and error from state', () => {
        const { result } = renderHook(() => useReadersData());

        expect(result.current.readers).toEqual(mockTransformedReaders);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('dispatches loadReaders if readers list is empty', () => {
        useSelectorMock.mockImplementation(selector => {
            const emptyState = { readers: { items: [], loading: false, error: null } };
            return selector(emptyState);
        });

        renderHook(() => useReadersData());

        expect(dispatchMock).toHaveBeenCalledWith(loadReaders());
    });

    it('does not dispatch loadReaders if readers list is not empty', () => {
        renderHook(() => useReadersData());

        expect(dispatchMock).not.toHaveBeenCalled();
    });
});
