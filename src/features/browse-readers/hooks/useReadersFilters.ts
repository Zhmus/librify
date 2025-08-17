import { ReaderEnriched } from 'entities/reader/types';
import { useEntityFilters } from 'shared/hooks/lists/useEntityFiltersFactory';
import { FilterType, FilterConfig } from 'shared/utils/filtering/filterItems';
import { CheckboxFilterConfig } from 'shared/utils/filtering/checkboxFilterConverter';

export type ReaderUiFilters = {
    name: string;
    email: string;
    registeredAt: string;
    hasCurrentLoans: boolean;
};

const initialReaderUiFilters: ReaderUiFilters = {
    name: '',
    email: '',
    registeredAt: '',
    hasCurrentLoans: false,
};

const readerCheckboxFilters: CheckboxFilterConfig<ReaderUiFilters, ReaderEnriched>[] = [
    {
        uiField: 'hasCurrentLoans',
        filterField: 'hasCurrentLoan',
        filterValueIfTrue: true,
    },
];

const readerFilterConfig: FilterConfig<ReaderEnriched> = {
    name: { type: FilterType.SUBSTRING },
    email: { type: FilterType.SUBSTRING },
    registeredAt: { type: FilterType.DATE },
    hasCurrentLoan: { type: FilterType.EXACT },
};

export const useReadersFilters = (readers: ReaderEnriched[]) => {
    const readersWithDate: ReaderEnriched[] = readers.map(reader => ({
        ...reader,
        registeredAt: new Date(reader.registeredAt),
    }));

    return useEntityFilters(
        readersWithDate,
        initialReaderUiFilters,
        readerCheckboxFilters,
        readerFilterConfig
    );
};
