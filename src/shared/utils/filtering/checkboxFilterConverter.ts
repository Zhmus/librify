import { FilterValues } from './filterItems';

export type CheckboxFilterConfig<
    UiFilters,
    Entity,
    TUiField extends keyof UiFilters = keyof UiFilters,
    TFilterField extends keyof Entity = keyof Entity,
> = {
    uiField: TUiField;
    filterField: TFilterField;
    filterValueIfTrue: NonNullable<Entity[TFilterField]>;
};

export function convertUiToFilter<UiFilters, Entity>(
    uiFilters: UiFilters,
    config: CheckboxFilterConfig<UiFilters, FilterValues<Entity>>[]
): FilterValues<Entity> {
    const result: Partial<Entity> = {};

    const uiFieldsInConfig = new Set(config.map(c => c.uiField as string));

    for (const key in uiFilters) {
        if (!uiFieldsInConfig.has(key)) {
            (result as any)[key] = uiFilters[key];
        }
    }

    for (const { uiField, filterField, filterValueIfTrue } of config) {
        const isTrue = uiFilters[uiField];
        result[filterField] = isTrue ? filterValueIfTrue : undefined;
    }

    return result as Entity;
}
