import { useMemo } from 'react';

export type Category = string;

export const useCategories = <Entity>(items: Entity[], categoryField: keyof Entity): string[] => {
    return useMemo(() => {
        return Array.from(
            new Set(
                items
                    .map(item => item[categoryField])
                    .filter(v => typeof v === 'string' && v.trim() !== '') as string[]
            )
        );
    }, [items, categoryField]);
};
