import { TextInput, SearchIcon } from '@equinor/fusion-components';
import { useAnchor } from '../../ApplicationGuidance';
import { FilterTerm, Filter } from '../applyFilters';

type SearchFilterProps<T> = {
    term: FilterTerm;
    onChange: (value: string) => void;
    filter: Filter<T>;
};

function SearchFilterComponent<T>({ filter, term, onChange }: SearchFilterProps<T>) {
    const anchorRef = useAnchor<HTMLDivElement>(filter.info);
    return (
        <div ref={anchorRef}>
            <TextInput
                id="search-filter"
                icon={<SearchIcon />}
                value={term ? (term.value as string) : ''}
                onChange={onChange}
            />
        </div>
    );
}

export default SearchFilterComponent;
