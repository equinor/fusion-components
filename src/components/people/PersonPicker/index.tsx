import React, { useMemo, useState, useRef, useCallback, useEffect } from 'react';
import {
    DropdownArrow,
    TextInput,
    Menu,
    Dropdown,
    useDropdownController,
    PersonCard,
} from '@equinor/fusion-components';

import styles from './styles.less';
import { PersonDetails, useDebouncedAbortable, useFusionContext } from '@equinor/fusion';

type PersonPickerOption = {
    personId: string;
    name: string;
    email: string;
};

type PersonPickerProps = {
    onSelect?: (item: PersonPickerOption) => void;
};

const usePersonQuery = (): [Error | null, boolean, PersonDetails[], (query: string) => void] => {
    const [error, setError] = useState(null);
    const [isQuerying, setQuerying] = useState(false);
    const [query, setQuery] = useState('');
    const [people, setPeople] = useState<PersonDetails[]>([]);

    const fusionContext = useFusionContext();

    const canQuery = (query: string) => !!query && query.length > 2;

    const fetchPeople = useCallback(async (query: string) => {
        if (canQuery(query)) {
            setPeople([]);
            try {
                const response = await fusionContext.http.apiClients.people.searchPersons(query);
                setPeople(response.data);
                setQuerying(false);
            } catch (e) {
                setError(e);
                setQuerying(false);
                setPeople([]);
            }
        }
    }, []);

    useDebouncedAbortable(fetchPeople, query);

    const search = (query: string) => {
        setQuerying(canQuery(query));
        setQuery(query);
    };

    return [error, isQuerying, people, search];
};

const filterPeople = (people: PersonDetails[], includedAccountTypes: string[]) => {
    return people.reduce((acc: PersonDetails[], curr: PersonDetails) => {
        const include = includedAccountTypes.indexOf(curr.accountType) !== -1;

        if (include) {
            acc.push(curr);
        }

        return acc;
    }, []);
};

export default ({ onSelect }: PersonPickerProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [primaryPeople, setPrimaryPeople] = useState<PersonDetails[]>([]);
    const [secondaryPeople, setSecondaryPeople] = useState<PersonDetails[]>([]);

    const [error, isQuerying, people, search] = usePersonQuery();

    useEffect(() => {
        if (people.length > 0) {
            setPrimaryPeople(filterPeople(people, ['consultant', 'employee']));
            setSecondaryPeople(filterPeople(people, ['external']));
        }
    }, [isQuerying, people]);

    useEffect(() => {
        search(inputValue);
    }, [inputValue]);

    const dropdownController = useDropdownController((ref, isOpen, setIsOpen) => {
        const value = useMemo(() => {
            if (isOpen) {
                return inputValue;
            }
        }, [isOpen, inputValue]);

        return (
            <TextInput
                placeholder="Type to search..."
                onChange={value => {
                    if (!isOpen) {
                        setIsOpen(true);
                        return;
                    }
                    setInputValue(value);
                }}
                label="Select person"
                icon={<DropdownArrow cursor="pointer" isOpen={isOpen} />}
                onIconAction={() => isOpen && setIsOpen(false)}
                onClick={() => !isOpen && setIsOpen(true)}
                value={value}
                ref={inputRef}
            />
        );
    });

    const { isOpen, setIsOpen } = dropdownController;

    const select = useCallback(
        item => {
            if (isOpen) {
                onSelect && onSelect(item);
                setIsOpen(false);
                setInputValue('');

                const personId = item.key;
                console.log(personId);
            }
        },
        [isOpen, onSelect]
    );

    const containerRef = dropdownController.controllerRef as React.MutableRefObject<HTMLDivElement | null>;

    return (
        <div className={styles.container} ref={containerRef}>
            <Dropdown controller={dropdownController}>
                <Menu
                    keyboardNavigationRef={inputRef.current}
                    onClick={select}
                    sections={[
                        {
                            key: 'NormalHits',
                            title: 'Employees and consultants',
                            items: [
                                {
                                    title: (
                                        <PersonCard
                                            email="msal@equinor.com"
                                            personId="e92c631b-94ae-4670-8f1e-60cdc2122edc"
                                            personName="Morten Salte"
                                            photoSize="medium"
                                        />
                                    ),
                                    key: 'personId1',
                                },
                                {
                                    title: (
                                        <PersonCard
                                            email="msal@equinor.com"
                                            personId="bla2"
                                            photoSize="medium"
                                            personName="Morten Salte"
                                        />
                                    ),
                                    key: 'personId2',
                                },
                            ],
                        },
                        {
                            key: 'External',
                            title: 'External hire',
                            items: [
                                {
                                    title: (
                                        <PersonCard
                                            email="msal@equinor.com"
                                            personId="bla2"
                                            photoSize="medium"
                                            personName="Morten Salte"
                                        />
                                    ),
                                    key: 'personId3',
                                },
                            ],
                        },
                    ]}
                />
            </Dropdown>
        </div>
    );
};
