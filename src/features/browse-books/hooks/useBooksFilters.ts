import { BookEnriched } from 'entities/book/types';
import { useEntityFilters } from 'shared/hooks/lists/useEntityFiltersFactory';
import { FilterType, FilterConfig } from 'shared/utils/filtering/filterItems';
import { CheckboxFilterConfig } from 'shared/utils/filtering/checkboxFilterConverter';

export type BookUiFilters = {
    author: string;
    title: string;
    genre: string;
    hideLoaned: boolean;
};

const initialBookUiFilters: BookUiFilters = {
    author: '',
    title: '',
    genre: '',
    hideLoaned: false,
};

type BookDataFilters = {
    author: string;
    title: string;
    genre: string;
    isLoaned?: boolean;
};

const bookCheckboxFilters: CheckboxFilterConfig<BookUiFilters, BookDataFilters>[] = [
    {
        uiField: 'hideLoaned',
        filterField: 'isLoaned',
        filterValueIfTrue: false,
    },
];

const bookFilterConfig: FilterConfig<BookEnriched> = {
    author: { type: FilterType.SUBSTRING },
    title: { type: FilterType.SUBSTRING },
    genre: { type: FilterType.EXACT },
    isLoaned: { type: FilterType.EXACT },
};

export const useBooksFilters = (books: BookEnriched[]) =>
    useEntityFilters(books, initialBookUiFilters, bookCheckboxFilters, bookFilterConfig);
