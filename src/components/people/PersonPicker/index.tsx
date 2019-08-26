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

export default ({ onSelect }: PersonPickerProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [dropdownOptions, setDropdownOptions] = useState<PersonPickerOption[]>([]);

    const [error, isQuerying, people, search] = usePersonQuery();
    
    const filterSearch = useCallback(inputValue => {
        // search for people
        console.log(inputValue);
    }, []);

    useEffect(() => filterSearch(inputValue), [inputValue]);

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

                console.log(item);
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
                            key: 'DropdownSelection',
                            items: [
                                {
                                    title: (
                                        <PersonCard
                                            affiliation="consultant"
                                            email="msal@equinor.com"
                                            personId="e92c631b-94ae-4670-8f1e-60cdc2122edc"
                                            personName="Morten Salte"
                                            photoSize="medium"
                                        />
                                    ),
                                    key: 'bla',
                                },
                                {
                                    title: (
                                        <PersonCard
                                            affiliation="affiliate"
                                            email="msal@equinor.com"
                                            personId="bla2"
                                            photoSize="medium"
                                            personName="Morten Salte"
                                        />
                                    ),
                                    key: 'bla2',
                                },
                            ],
                        },
                    ]}
                />
            </Dropdown>
        </div>
    );
};
