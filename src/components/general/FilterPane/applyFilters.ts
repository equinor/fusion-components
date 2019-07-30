import FilterTypes from './filterTypes';
import Filter from './components/Filter';

export type FilterTerm = {
    key: string;
    value: string | string[];
};

type Collapsible = {
    isCollapsible?: boolean;
    isCollapsed?: boolean;
};

export type Filter<T> = Collapsible & {
    key: string;
    title: string;
    isVisibleWhenPaneIsCollapsed?: boolean;
    type: FilterTypes;
    getValue: (item: T) => string | string[];
    options?: any;
};

export type FilterSection<T> = Collapsible & {
    key: string;
    title: string;
    filters: Filter<T>[];
};

export type FilterOptions<T> = {
    filters?: Filter<T>[];
    terms: FilterTerm[];
    sectionDefinitions: FilterSection<T>[];
};

export type OnFilterChangeHandler<T> = (data: T[], terms: FilterTerm[]) => void;

const applyFilter = <T>(item: T, filter: Filter<T>, term?: FilterTerm) => {
    if (!filter.getValue || !term || !term.value.length) {
        return true;
    }

    const itemValue = filter.getValue(item);

    switch (filter.type) {
        case FilterTypes.Checkbox:
        case FilterTypes.Radio:
            if (Array.isArray(itemValue)) {
                return itemValue.filter(iv => term.value.indexOf(iv) > -1).length > 0;
            }

            return term.value.indexOf(itemValue) > -1;

        case FilterTypes.Search:
            // Todo: Implement proper search
            return (itemValue as string).toLowerCase().indexOf((term.value as string).toLowerCase()) > -1;
    }
};

const applyFiltersToItem = <T>(item: T, filters: Filter<T>[], terms: FilterTerm[]) => {
    return filters.map(filter =>
        applyFilter(item, filter, terms.find(term => term.key === filter.key))
    );
};

const applySections = <T>(item: T, sectionDefinitions: FilterSection<T>[], terms: FilterTerm[]) => {
    return sectionDefinitions.map(sectionDefinition => {
        const filterResults = applyFiltersToItem(item, sectionDefinition.filters, terms);
        return filterResults.reduce((isMatch, filterIsMatch) => isMatch && filterIsMatch, true);
    });
};

const apply = <T>(data: T[], { sectionDefinitions, filters, terms }: FilterOptions<T>) => {
    if (filters && filters.length > 0) {
        return data.filter(item => {
            const filterResults = applyFiltersToItem(item, filters, terms);
            return filterResults.reduce((isMatch, filterIsMatch) => isMatch && filterIsMatch, true);
        });
    }

    return data.filter(item => {
        const sectionResults = applySections(item, sectionDefinitions, terms);
        return sectionResults.reduce((isMatch, sectionIsMatch) => isMatch && sectionIsMatch, true);
    });
};

const applyFilters = <T>(data: T[], options: FilterOptions<T>) =>
    new Promise<T[]>(resolve => {
        window.requestAnimationFrame(() => resolve(apply(data, options)));
    });

export type FilterAndNotify<T> = {
    filteredData: T[];
    sectionDefinitions: FilterSection<T>[];
    filters?: Filter<T>[];
    terms: FilterTerm[];
}

export const filterAndNotify = async <T>(
    { filteredData, sectionDefinitions, filters, terms }: FilterAndNotify<T>,
    onChange: OnFilterChangeHandler<T>
) => {
    const newFilteredData = await applyFilters(filteredData, {
        sectionDefinitions,
        filters,
        terms,
    });

    onChange(newFilteredData, terms);
};

export const mergeTerms = <T>(terms: FilterTerm[], filter: Filter<T>, newTerm: FilterTerm) => {
    let newTerms = terms.slice();

    if (!newTerm) {
        // The term has no valu > remove it from the list of terms
        newTerms = newTerms.filter(term => term.key !== filter.key);
    } else {
        // Merge the terms replacing existing term with the new one
        newTerms = terms.map(term => (term.key === newTerm.key ? newTerm : term));

        if (!newTerms.find(term => term.key === filter.key)) {
            // Insert the term if it didn't exist
            newTerms.push(newTerm);
        }
    }

    return newTerms;
};

export default applyFilters;
