import React from 'react';
import { FilterTerm } from '../applyFilters';
import SearchIcon from 'components/icons/components/action/SearchIcon';
import TextInput from 'components/general/TextInput';

type SearchFilterProps = {
    term: FilterTerm;
    onChange: (value: string) => void;
};

const SearchFilterComponent: React.FC<SearchFilterProps> = ({ term, onChange }) => {
    return <TextInput icon={<SearchIcon />} value={term ? term.value as string : ''} onChange={onChange} />;
};

export default SearchFilterComponent;
