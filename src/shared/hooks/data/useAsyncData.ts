import { useEffect, useState } from 'react';

type AsyncDataState<T> = {
    data: T | null;
    loading: boolean;
    error: Error | null;
};

export function useAsyncData<T>(asyncFunc: () => Promise<T>): AsyncDataState<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await asyncFunc();
                if (!cancelled) setData(result);
            } catch (e) {
                if (!cancelled) setError(e as Error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        void load();

        return () => {
            cancelled = true;
        };
    }, [asyncFunc]);

    return { data, loading, error };
}
