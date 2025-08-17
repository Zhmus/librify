import { renderHook, waitFor } from '@testing-library/react';
import { useAsyncData } from './useAsyncData';

describe('useAsyncData', () => {
    it('should load data successfully', async () => {
        const asyncFunc = jest.fn(() => Promise.resolve('mocked data'));

        const { result } = renderHook(() => useAsyncData(asyncFunc));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.data).toBe('mocked data');
        expect(result.current.error).toBeNull();
    });

    it('should handle error', async () => {
        const error = new Error('Something went wrong');
        const asyncFunc = jest.fn(() => Promise.reject(error));

        const { result } = renderHook(() => useAsyncData(asyncFunc));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.data).toBeNull();
            expect(result.current.error).toBe(error);
        });
    });
});
