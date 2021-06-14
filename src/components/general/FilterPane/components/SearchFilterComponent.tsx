import { TextInput, SearchIcon, ApplicationGuidanceAnchor } from '@equinor/fusion-components';
import { FilterTerm, Filter } from '../applyFilters';

type SearchFilterProps<T> = {
    term: FilterTerm;
    onChange: (value: string) => void;
    filter: Filter<T>;
};

function SearchFilterComponent<T>({ filter, term, onChange }: SearchFilterProps<T>) {
    return (
        <ApplicationGuidanceAnchor anchor={filter?.info?.id} scope={filter?.info?.scope}>
            <TextInput
                icon={<SearchIcon />}
                value={term ? (term.value as string) : ''}
                onChange={onChange}
            />
        </ApplicationGuidanceAnchor>
    );
}

export default SearchFilterComponent;
