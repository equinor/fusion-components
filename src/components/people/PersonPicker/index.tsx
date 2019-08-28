import React, { useMemo, useState, FC, useRef, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import {
    DropdownArrow,
    TextInput,
    Menu,
    Dropdown,
    useDropdownController,
    PersonCard,
    PersonPhoto,
} from '@equinor/fusion-components';

import styles from './styles.less';
import {
    PersonDetails,
    useDebouncedAbortable,
    useFusionContext,
    PersonAccountType,
} from '@equinor/fusion';

type PersonPickerOption = {
    title: string;
    key: string;
    group: ResultGroup;
    isSelected?: boolean;
    isDisabled?: boolean;
};

type ResultGroup = 'primary' | 'secondary';

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

const filterPeople = (people: PersonDetails[], includedAccountTypes: PersonAccountType[]) => {
    return people.reduce((acc: PersonDetails[], curr: PersonDetails) => {
        const include = includedAccountTypes.indexOf(curr.accountType) !== -1;

        if (include) {
            acc.push(curr);
        }

        return acc;
    }, []);
};

const ItemComponent = ({ item }) => {
    return <PersonCard personId="e92c631b-94ae-4670-8f1e-60cdc2122edc" photoSize="medium" />;
};

const SelectedPerson = ({ personId, onClick, ref }) => {
    return (
        <div onClick={onClick} ref={ref} className={styles.selectedPerson}>
            <div className={styles.content}>
                <PersonPhoto personId="e92c631b-94ae-4670-8f1e-60cdc2122edc" size="medium" />
                <div className={styles.name}>Morten Salte</div>
            </div>
            <div className={styles.icon}>
                <DropdownArrow cursor="pointer" isOpen={false} />
            </div>
        </div>
    );
};

export default ({ onSelect }: PersonPickerProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [primaryItems, setPrimaryItems] = useState<PersonPickerOption[]>([]);
    const [secondaryItems, setSecondaryItems] = useState<PersonPickerOption[]>([]);
    const [isSelected, setSelected] = useState(false);

    const [error, isQuerying, people, search] = usePersonQuery();

    useEffect(() => {
        if (people.length > 0) {
            const relevantPeople = people.splice(0, 10);

            setPrimaryItems(
                relevantPeople.map((p, i) => ({
                    title: 'p.azureUniqueId' + i,
                    key: 'p.azureUniqueId' + i,
                    group: 'primary',
                }))
            );
            // setPrimaryPeople(people.splice(0, 7));
            // setSecondaryPeople(people.splice(8, 3));
            // setPrimaryPeople(filterPeople(people, ['consultant', 'employee']));
            // setSecondaryPeople(filterPeople(people, ['external', 'local']));
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

        if (!isOpen && isSelected) {
            return <SelectedPerson ref={ref} onClick={() => setIsOpen(true)} personId="" />;
        }

        return (
            <TextInput
                placeholder="Type to search..."
                onChange={value => {
                    if (!isOpen) {
                        setIsOpen(true);
                        return;
                    }
                    setSelected(false);
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
            switch (item.group) {
                case 'primary':
                    setPrimaryItems(
                        primaryItems.map(p => ({ ...p, isSelected: p.key === item.key }))
                    );
                    break;
                case 'secondary':
                    setSecondaryItems(
                        secondaryItems.map(p => ({ ...p, isSelected: p.key === item.key }))
                    );
                    break;
            }

            setSelected(true);
            if (isOpen) {
                onSelect && onSelect(item);
                setIsOpen(false);
                setInputValue('');
            }
        },
        [isOpen, onSelect, primaryItems]
    );

    const containerRef = dropdownController.controllerRef as React.MutableRefObject<HTMLDivElement | null>;

    return (
        <div className={styles.container} ref={containerRef}>
            <Dropdown controller={dropdownController}>
                <Menu
                    elevation={0}
                    keyboardNavigationRef={inputRef.current}
                    onClick={select}
                    itemComponent={ItemComponent}
                    sections={[
                        {
                            key: 'primary',
                            title: 'Employees and consultants',
                            items: primaryItems,
                        },
                        {
                            key: 'secondary',
                            title: 'External hire',
                            items: secondaryItems,
                        },
                    ]}
                />
            </Dropdown>
        </div>
    );
};
