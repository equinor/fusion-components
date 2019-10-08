import React, { useState, useEffect, useCallback } from 'react';
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

type PersonPickerProps = {
    label?: string;
    placeholder?: string;
    initialPerson?: PersonDetails;
    onSelect?: (person: PersonDetails) => void;
};

const ItemComponent = ({ item }) => {
    const tooltipRef = useTooltipRef(item.person ? item.person.mail : '');

    if (item.person) {
        return <div ref={tooltipRef}>{item.title}</div>;
    }

    return item.title;
};

const AsideComponent = ({ item }) => {
    if (item.key === 'empty') {
        return null;
    }

    return <PersonPhoto person={item.person} size="medium" hideTooltip />;
};

export default ({ initialPerson, onSelect, label, placeholder }: PersonPickerProps) => {
    const [sections, setSections] = useState<SearchableDropdownSection[]>([]);
    const [error, isQuerying, people, search] = usePersonQuery();
    const [searchQuery, setSearchQuery] = useState('');
    const [peopleMatch, setPeopleMatch] = useState<PersonDetails[]>([]);
    const [selectedPersonId, setSelectedPersonId] = useState('');
    const [isInitialized, setInitialized] = useState(false);

    useEffect(() => {
        if (initialPerson && !isInitialized) {
            setSections(singlePersonToDropdownSection(initialPerson));
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
            setSections(peopleToSections(peopleMatch, selectedPersonId, searchQuery, isQuerying));
        } else {
            setInitialized(searchQuery !== '');
        }
    }, [peopleMatch, searchQuery, selectedPersonId, isQuerying]);

    const handleSelect = useCallback(item => {
        setSelectedPersonId(item.key);

        if (onSelect) {
            onSelect(item.person);
        }
    }, []);

    return (
        <SearchableDropdown
            sections={sections}
            onSelect={handleSelect}
            onSearchAsync={query => setSearchQuery(query)}
            itemComponent={ItemComponent}
            asideComponent={AsideComponent}
            label={label}
            placeholder={placeholder}
        />
    );
};
