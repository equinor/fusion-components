import { useState, useEffect, useCallback } from 'react';
import {
    PersonPhoto,
    SearchableDropdown,
    SearchableDropdownSection,
    useTooltipRef,
} from '@equinor/fusion-components';

import { PersonDetails } from '@equinor/fusion';
import usePersonQuery from '../usePersonQuery';
import peopleToSections, { singlePersonToDropdownSection } from './peopleToDropdownSections';

export type PersonPickerOption = {
    title: string;
    key: string;
    isSelected?: boolean;
    isDisabled?: boolean;
};

export type SectionFnProps = {
    people: PersonDetails[];
    selectedId: string;
    searchQuery: string;
    isQuerying: boolean;
};

type PersonPickerProps = {
    label?: string;
    placeholder?: string;
    initialPerson?: PersonDetails | null;
    selectedPerson: PersonDetails | null;
    hasError?: boolean;
    errorMessage?: string;
    onSelect?: (person: PersonDetails) => void;
    sectionFn?: ({
        people,
        selectedId,
        searchQuery,
        isQuerying,
    }: SectionFnProps) => SearchableDropdownSection[];
};

const ItemComponent = ({ item }) => {
    const tooltipRef = useTooltipRef(item.person ? item.person.mail : '');

    if (item.person) {
        return (
            <div ref={tooltipRef}>
                {item.title} <br />
                {item.person.mail}
            </div>
        );
    }
    return item.title;
};

const SelectedItemComponent = ({ item }) => {
    if (item && item.person) {
        return (
            <div>
                {item.title} <br />
                {item.person.mail}
            </div>
        );
    }
    return null;
};

const AsideComponent = ({ item }) => {
    if (item.key === 'empty') {
        return null;
    }

    return <PersonPhoto person={item.person} size="medium" hideTooltip />;
};

export default ({
    initialPerson,
    selectedPerson,
    onSelect,
    hasError,
    errorMessage,
    label,
    placeholder,
    sectionFn = peopleToSections,
}: PersonPickerProps) => {
    const [sections, setSections] = useState<SearchableDropdownSection[]>([]);
    const [error, isQuerying, people, search] = usePersonQuery();
    const [searchQuery, setSearchQuery] = useState('');
    const [peopleMatch, setPeopleMatch] = useState<PersonDetails[]>([]);
    const [isInitialized, setInitialized] = useState(false);

    useEffect(() => {
        if (initialPerson && !isInitialized) {
            setSections(singlePersonToDropdownSection(initialPerson));
        } else {
            setSections([]);
        }
    }, [isInitialized, initialPerson]);

    useEffect(() => {
        search(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        setPeopleMatch(people.splice(0, 10));
    }, [people]);

    useEffect(() => {
        if (isInitialized) {
            setSections(
                sectionFn({
                    people: peopleMatch,
                    selectedId: selectedPerson != null ? selectedPerson.azureUniqueId : '',
                    searchQuery,
                    isQuerying,
                })
            );
        } else {
            setInitialized(searchQuery !== '');
        }
    }, [peopleMatch, searchQuery, selectedPerson, isQuerying]);

    const handleSelect = useCallback(
        (item) => {
            if (onSelect) {
                onSelect(item.person);
            }
        },
        [onSelect]
    );

    return (
        <SearchableDropdown
            sections={sections}
            onSelect={handleSelect}
            onSearchAsync={(query) => setSearchQuery(query)}
            error={hasError}
            errorMessage={errorMessage}
            itemComponent={ItemComponent}
            asideComponent={AsideComponent}
            selectedComponent={SelectedItemComponent}
            label={label}
            placeholder={placeholder}
        />
    );
};
