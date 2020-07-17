import React from 'react';
import { TextInput, SearchIcon } from '@equinor/fusion-components';
import { FilterTerm, Filter } from '../applyFilters';

type SearchFilterProps<T> = {
    term: FilterTerm;
    onChange: (value: string) => void;
    quickFactScope?: string;
    filter: Filter<T>,
};

function SearchFilterComponent<T>({ filter, term, onChange, quickFactScope }: SearchFilterProps<T>) {
    return (
        <app-guide-anchor id={filter.key} scope={quickFactScope}>
            <TextInput
                icon={<SearchIcon />}
                value={term ? (term.value as string) : ''}
                onChange={onChange}
            />
        </app-guide-anchor>
    );
};

export default SearchFilterComponent;
