import { Reader } from 'entities/reader/types';
import { useEntityFilters } from 'shared/hooks/lists/useEntityFiltersFactory';
import { FilterType, FilterConfig } from 'shared/utils/filtering/filterItems';
import { CheckboxFilterConfig } from 'shared/utils/filtering/checkboxFilterConverter';

type ReaderUiFilters = {
    name: string;
};

const initialUiFilters: ReaderUiFilters = {
    name: '',
};

type ReaderDataFilters = {
    name: string;
};

const checkboxFilters: CheckboxFilterConfig<ReaderUiFilters, ReaderDataFilters>[] = [];

const readerFilterConfig: FilterConfig<Reader> = {
    name: { type: FilterType.SUBSTRING },
};

export const useReadersFilters = (readers: Reader[]) => {
    return useEntityFilters(readers, initialUiFilters, checkboxFilters, readerFilterConfig);
};
