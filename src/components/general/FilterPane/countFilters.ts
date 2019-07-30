import applyFiltersToitem, {
    Filter,
    FilterTerm,
    FilterOptions,
    FilterSection,
} from './applyFilters';
import FilterTypes from './filterTypes';

export type FilterCount = {
    key: string;
    count: number;
};

export type Count = {
    key: string;
    count: FilterCount[] | number;
};

export type OnFilterCountChangeHandler = (count: Count[]) => void;

const countFilter = async <T>(
    data: T[],
    filter: Filter<T>,
    otherFilters: Filter<T>[],
    terms: FilterTerm[]
): Promise<FilterCount[] | number> => {
    if (!filter.getValue) {
        return -1;
    }

    const filteredData = await applyFiltersToitem(data, {
        filters: otherFilters,
        terms,
        sectionDefinitions: [],
    });

    switch (filter.type) {
        case FilterTypes.Checkbox:
            return filter.options.map(option => {
                return {
                    key: option.key,
                    count: filteredData.filter(item => {
                        const itemValue = filter.getValue(item);

                        if (Array.isArray(itemValue)) {
                            return itemValue.filter(iv => iv === option.key).length > 0;
                        }

                        return itemValue === option.key;
                    }).length,
                };
            });
    }

    return -1;
};

const countFilters = async <T>(data: T[], { sectionDefinitions, terms }: FilterOptions<T>) => {
    // Flatten section definitions to a list of filters
    const allFilters = sectionDefinitions.reduce(
        (filters, section) => filters.concat(section.filters),
        [] as Filter<T>[]
    );

    const result: Count[] = [];
    for (let i = 0; i < allFilters.length; i++) {
        const currentFilter = allFilters[i];
        const count = await countFilter(
            data,
            currentFilter,
            allFilters.filter(filter => filter.key !== currentFilter.key),
            terms
        );
        result.push({
            key: currentFilter.key,
            count,
        });
    }

    return result;
};

const countFiltersAsync = <T>(data: T[], options: FilterOptions<T>) =>
    new Promise<Count[]>(resolve => {
        if (!data || !data.length) {
            return resolve([]);
        }

        window.requestAnimationFrame(async () => {
            const result = await countFilters(data, options);
            resolve(result);
        });
    });

export const applyCountAsync = async <T>(
    data: T[],
    sectionDefinitions: FilterSection<T>[],
    terms: FilterTerm[],
    setFilterCount: OnFilterCountChangeHandler,
    abortSignal: AbortSignal
) => {
    const newFilterCount = await countFiltersAsync(data, {
        sectionDefinitions,
        terms,
    });

    if (abortSignal.aborted) {
        return;
    }

    setFilterCount(newFilterCount);
};

export default countFiltersAsync;
