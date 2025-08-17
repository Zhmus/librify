import { useState, useMemo } from 'react';

export type SortDirection = 'asc' | 'desc';

export type SortingState<Entity> = {
    sortField: keyof Entity | null;
    sortDirection: SortDirection;
    requestSort: (field: keyof Entity) => void;
    setSorting: (params: { field: keyof Entity; order: SortDirection }) => void;
};

export function useSorting<T>(items: T[], defaultSortField?: keyof T) {
    const [sortField, setSortField] = useState<keyof T | null>(defaultSortField ?? null);
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const resultItems = useMemo(() => {
        if (!sortField) return items;

        return [...items].sort((a, b) => {
            const aVal = a[sortField];
            const bVal = b[sortField];

            if (typeof aVal === 'boolean' && typeof bVal === 'boolean') {
                return sortDirection === 'asc'
                    ? Number(aVal) - Number(bVal)
                    : Number(bVal) - Number(aVal);
            }

            if (typeof aVal === 'string' && typeof bVal === 'string') {
                return sortDirection === 'asc'
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            }

            if (typeof aVal === 'number' && typeof bVal === 'number') {
                return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
            }

            if (aVal instanceof Date && bVal instanceof Date) {
                return sortDirection === 'asc'
                    ? aVal.getTime() - bVal.getTime()
                    : bVal.getTime() - aVal.getTime();
            }

            return 0;
        });
    }, [items, sortField, sortDirection]);

    const requestSort = (field: keyof T) => {
        if (field === sortField) {
            setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const setSorting = (params: { field: keyof T; order: SortDirection }) => {
        setSortField(params.field);
        setSortDirection(params.order);
    };

    return {
        resultItems,
        sortingState: {
            sortField,
            sortDirection,
            requestSort,
            setSorting,
        },
    };
}
