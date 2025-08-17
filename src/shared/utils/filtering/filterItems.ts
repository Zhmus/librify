export enum FilterType {
    SUBSTRING = 'substring',
    EXACT = 'exact',
    DATE = 'date',
}

export type FilterConfig<T> = {
    [K in keyof T]?: {
        type: FilterType;
    };
};

export type FilterValues<T> = Partial<{
    [K in keyof T]: T[K];
}>;

const isFilterValueEmpty = (value: unknown): boolean => value == null || value === '';

function matchesFilter<T>(
    item: T,
    key: keyof T,
    filterValue: unknown,
    filterConfig?: { type: FilterType }
): boolean {
    if (isFilterValueEmpty(filterValue)) return true;
    if (!filterConfig) return true;

    const itemValue = item[key];

    switch (filterConfig.type) {
        case FilterType.SUBSTRING:
            return typeof itemValue === 'string'
                ? itemValue.toLowerCase().includes(String(filterValue).toLowerCase())
                : false;

        case FilterType.EXACT:
            return itemValue === filterValue;

        case FilterType.DATE: {
            if (!(itemValue instanceof Date)) return false;
            const filterDate = new Date(String(filterValue));
            return itemValue >= filterDate;
        }

        default:
            return true;
    }
}

function filterItems<T>(items: T[], filters: FilterValues<T>, config: FilterConfig<T>): T[] {
    return items.filter(item =>
        (Object.keys(config) as (keyof T)[]).every(key =>
            matchesFilter(item, key, filters[key], config[key])
        )
    );
}

export default filterItems;
