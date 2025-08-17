import { useStatsData } from './useStatsData';

export function useStatsManager() {
    const { data, loading, error } = useStatsData();

    return {
        loadStatus: { loading, error },
        stats: {
            books: data.books,
            readers: data.readers,
            loans: data.loans,
        },
    };
}
