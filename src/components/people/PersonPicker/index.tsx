import React, { useState, useEffect, useCallback } from 'react';
import {
    PersonPhoto,
    SearchableDropdownWrapper,
    SearchableDropdownSection,
    useTooltipRef,
} from '@equinor/fusion-components';

import { PersonDetails } from '@equinor/fusion';
import usePersonQuery from '../usePersonQuery';
import peopleToSections from './peopleToDropdownSections';

export type PersonPickerOption = {
    title: string;
    key: string;
    isSelected?: boolean;
    isDisabled?: boolean;
};

type PersonPickerProps = {
    onSelect?: (item: PersonPickerOption) => void;
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

export default ({ onSelect }: PersonPickerProps) => {
    const [sections, setSections] = useState<SearchableDropdownSection[]>([]);
    const [error, isQuerying, people, search] = usePersonQuery();
    const [searchQuery, setSearchQuery] = useState('');
    const [peopleMatch, setPeopleMatch] = useState<PersonDetails[]>([]);
    const [selectedPersonId, setSelectedPersonId] = useState('');

    useEffect(() => {
        search(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        setPeopleMatch(people.splice(0, 10));
    }, [people]);

    useEffect(() => {
        setSections(peopleToSections(peopleMatch, selectedPersonId, searchQuery, isQuerying));
    }, [peopleMatch, searchQuery, selectedPersonId, isQuerying]);

    const handleSelect = useCallback(item => {
        setSelectedPersonId(item.key);

        if (onSelect) {
            onSelect(item);
        }
    }, []);

    return (
        <SearchableDropdownWrapper
            sections={sections}
            onSelect={handleSelect}
            onSearchAsync={query => setSearchQuery(query)}
            itemComponent={ItemComponent}
            asideComponent={AsideComponent}
            label="Select person"
        />
    );
};
