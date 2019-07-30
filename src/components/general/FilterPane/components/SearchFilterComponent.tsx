import React from 'react';
import { TextInput, SearchIcon } from '@equinor/fusion-components';
import { FilterTerm } from '../applyFilters';

type SearchFilterProps = {
    term: FilterTerm;
    onChange: (value: string) => void;
};

const SearchFilterComponent: React.FC<SearchFilterProps> = ({ term, onChange }) => {
    return <TextInput icon={<SearchIcon />} value={term ? term.value as string : ''} onChange={onChange} />;
};

export default SearchFilterComponent;
