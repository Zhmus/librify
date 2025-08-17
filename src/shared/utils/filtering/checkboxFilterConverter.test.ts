import { CheckboxFilterConfig, convertUiToFilter } from './checkboxFilterConverter';

type UiFilters = {
    title: any;
    hideLoaned: boolean;
    showArchived: boolean;
};

type Filter = {
    title: any;
    isLoaned?: boolean;
    isArchived?: boolean;
};

const config = [
    {
        uiField: 'hideLoaned',
        filterField: 'isLoaned',
        filterValueIfTrue: false,
    },
    {
        uiField: 'showArchived',
        filterField: 'isArchived',
        filterValueIfTrue: true,
    },
] as const satisfies CheckboxFilterConfig<UiFilters, Filter>[];

describe('convertUiToFilter', () => {
    it('should apply filterValueIfTrue when uiField is true', () => {
        const uiFilters: UiFilters = {
            title: '',
            hideLoaned: true,
            showArchived: true,
        };

        const result = convertUiToFilter<UiFilters, Filter>(uiFilters, config);

        expect(result).toEqual({
            title: '',
            isLoaned: false,
            isArchived: true,
        });
    });

    it('should set filterField to undefined when uiField is false', () => {
        const uiFilters: UiFilters = {
            title: '',
            hideLoaned: false,
            showArchived: false,
        };

        const result = convertUiToFilter<UiFilters, Filter>(uiFilters, config);

        expect(result).toEqual({
            title: '',
            isLoaned: undefined,
            isArchived: undefined,
        });
    });

    it('should mix true and false correctly', () => {
        const uiFilters: UiFilters = {
            title: '',
            hideLoaned: true,
            showArchived: false,
        };

        const result = convertUiToFilter<UiFilters, Filter>(uiFilters, config);

        expect(result).toEqual({
            title: '',
            isLoaned: false,
            isArchived: undefined,
        });
    });
});
