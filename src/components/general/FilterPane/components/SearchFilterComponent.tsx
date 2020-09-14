import React from 'react';
import { FilterTerm, Filter } from '../applyFilters';
import SearchIcon from 'components/icons/components/action/SearchIcon';
import TextInput from 'components/general/TextInput';
import { ApplicationGuidanceAnchor } from 'components/general/ApplicationGuidance';

type SearchFilterProps<T> = {
    term: FilterTerm;
    onChange: (value: string) => void;
    quickFactScope?: string;
    filter: Filter<T>,
};

function SearchFilterComponent<T>({ filter, term, onChange, quickFactScope }: SearchFilterProps<T>) {
    return (
        <ApplicationGuidanceAnchor id={filter.key} scope={quickFactScope}>
            <TextInput
                icon={<SearchIcon />}
                value={term ? (term.value as string) : ''}
                onChange={onChange}
            />
        </ApplicationGuidanceAnchor>
    );
};

export default SearchFilterComponent;
