import { TextInput, SearchIcon, ApplicationGuidanceAnchor } from '@equinor/fusion-components';
import { FilterTerm, Filter } from '../applyFilters';

type SearchFilterProps<T> = {
    term: FilterTerm;
    onChange: (value: string) => void;
    quickFactScope?: string;
    filter: Filter<T>;
};

function SearchFilterComponent<T>({
    filter,
    term,
    onChange,
    quickFactScope,
}: SearchFilterProps<T>) {
    return (
        <ApplicationGuidanceAnchor anchor={filter.key} scope={quickFactScope}>
            <TextInput
                icon={<SearchIcon />}
                value={term ? (term.value as string) : ''}
                onChange={onChange}
            />
        </ApplicationGuidanceAnchor>
    );
}

export default SearchFilterComponent;
