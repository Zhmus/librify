import { useState, useRef, useEffect, useMemo } from 'react';

export type PaginationState = {
    hasMore: boolean;
    loadingMore: boolean;
    loadMore: () => void;
};

export function usePagination<T>(items: T[], limit: number) {
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const prevLengthRef = useRef(items.length);

    useEffect(() => {
        if (items.length < prevLengthRef.current) {
            setPage(1);
        }
        prevLengthRef.current = items.length;
    }, [items]);

    const resultItems = useMemo(() => items.slice(0, page * limit), [items, page, limit]);
    const hasMore = items.length > resultItems.length;

    const loadMore = () => {
        if (!hasMore) return;
        setLoadingMore(true);
        setTimeout(() => {
            setPage(prev => prev + 1);
            setLoadingMore(false);
        }, 300);
    };

    return {
        resultItems,
        paginationState: {
            hasMore,
            loadingMore,
            loadMore,
        },
    };
}
