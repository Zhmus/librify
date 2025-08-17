import { useState, useMemo } from 'react';
import {
    convertUiToFilter,
    CheckboxFilterConfig,
} from '../../utils/filtering/checkboxFilterConverter';
import filterItems, { FilterConfig, FilterValues } from '../../utils/filtering/filterItems';

export function useEntityFilters<Entity, UiFilters>(
    items: Entity[],
    defaultUiFilters: UiFilters,
    checkboxFilterConfig: CheckboxFilterConfig<UiFilters, FilterValues<Entity>>[],
    filterLogicConfig: FilterConfig<Entity>
) {
    const [uiFilters, setUiFilters] = useState<UiFilters>(defaultUiFilters);

    const structuredFilter = useMemo(
        () => convertUiToFilter(uiFilters, checkboxFilterConfig),
        [uiFilters, checkboxFilterConfig]
    );

    const resultItems = useMemo(
        () => filterItems(items, structuredFilter, filterLogicConfig),
        [items, structuredFilter, filterLogicConfig]
    );

    return {
        resultItems,
        filtersState: {
            uiFilters,
            setUiFilters,
        },
    };
}
