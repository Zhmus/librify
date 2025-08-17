import { LoanEnriched } from 'entities/loan/types';
import { useEntityFilters } from 'shared/hooks/lists/useEntityFiltersFactory';
import { FilterType, FilterConfig } from 'shared/utils/filtering/filterItems';
import { CheckboxFilterConfig } from 'shared/utils/filtering/checkboxFilterConverter';

export type LoanUiFilters = {
    userName: string;
    bookAuthor: string;
    bookTitle: string;
    showLoaned: boolean;
};

const initialLoanUiFilters: LoanUiFilters = {
    userName: '',
    bookAuthor: '',
    bookTitle: '',
    showLoaned: false,
};

type LoanDataFilters = {
    userName: string;
    bookAuthor: string;
    bookTitle: string;
    isLoaned: boolean;
};

const loanCheckboxFilters: CheckboxFilterConfig<LoanUiFilters, LoanDataFilters>[] = [
    {
        uiField: 'showLoaned',
        filterField: 'isLoaned',
        filterValueIfTrue: true,
    },
];

const loanFilterConfig: FilterConfig<LoanEnriched> = {
    userName: { type: FilterType.SUBSTRING },
    bookAuthor: { type: FilterType.SUBSTRING },
    bookTitle: { type: FilterType.SUBSTRING },
    loanDate: { type: FilterType.DATE },
    returnDate: { type: FilterType.DATE },
    isLoaned: { type: FilterType.EXACT },
};

export const useLoansFilters = (loans: LoanEnriched[]) =>
    useEntityFilters(loans, initialLoanUiFilters, loanCheckboxFilters, loanFilterConfig);
