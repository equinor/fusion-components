import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import {
    TextInput,
    DropdownArrow,
    Menu,
    Dropdown,
    useDropdownController,
} from '@equinor/fusion-components';
import styles from './styles.less';

export type SearchableDropdownOption = {
    title: string;
    key: string;
    isSelected?: boolean;
    isDisabled?: boolean;
};

export type SearchableDropdownSection = {
    key: string;
    title?: string;
    items: SearchableDropdownOption[];
};

type SearchableDropdownProps = {
    label?: string;
    options?: SearchableDropdownOption[];
    sections?: SearchableDropdownSection[];
    itemComponent?: any;
    asideComponent?: any;
    onSelect?: (item: SearchableDropdownOption) => void;
    onSearchAsync?: (query: string) => void;
};

const createSingleSectionFromOptions = (
    options: SearchableDropdownOption[]
): SearchableDropdownSection[] => [{ key: 'DropdownSection', items: options }];

const mergeDropdownSectionItems = (sections: SearchableDropdownSection[]) =>
    sections.reduce(
        (acc: SearchableDropdownOption[], curr: SearchableDropdownSection) =>
            acc.concat(curr.items),
        []
    );

const SearchableDropdown = ({
    options,
    sections,
    label,
    onSelect,
    onSearchAsync,
    itemComponent,
    asideComponent,
}: SearchableDropdownProps) => {
    if ((!options && !sections) || (options && sections)) {
        throw new Error("You must supply only one of 'options', 'sections' props");
    }

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [inputValue, setInputValue] = useState('');

    const [dropdownSections, setDropdownSections] = useState<SearchableDropdownSection[]>([]);
    const [selectedItem, setSelectedItem] = useState();

    useEffect(() => {
        if (sections) {
            setDropdownSections(sections);
        } else if (options) {
            setDropdownSections(createSingleSectionFromOptions(options));
        }
    }, [options, sections]);

    const filterSearch = useCallback(
        inputValue => {
            if (onSearchAsync) {
                onSearchAsync(inputValue);
            } else {
                if (options) {
                    const newOptions = options.filter(option =>
                        option.title.toLowerCase().includes(inputValue.toLowerCase())
                    );
                    setDropdownSections(createSingleSectionFromOptions(newOptions));
                }
                // TODO: handle sections
            }
        },
        [options, sections, onSearchAsync]
    );

    useEffect(() => filterSearch(inputValue), [inputValue]);

    const dropdownController = useDropdownController((ref, isOpen, setIsOpen) => {
        const value = useMemo(() => {
            if (isOpen) {
                return inputValue;
            }

            const mergedItems = mergeDropdownSectionItems(dropdownSections);
            const selectedItem = mergedItems.find(option => option.isSelected === true);

            return selectedItem ? selectedItem.title : '';
        }, [isOpen, inputValue, options, dropdownSections]);

        const aside = useMemo(() => {
            if (asideComponent && selectedItem && !isOpen) {
                const AsideComponent = asideComponent;
                return (
                    <aside>
                        <AsideComponent item={selectedItem} />
                    </aside>
                );
            }

            return null;
        }, [selectedItem, isOpen, asideComponent]);

        return (
            <TextInput
                onChange={value => {
                    if (!isOpen) {
                        setIsOpen(true);
                        return;
                    }
                    setInputValue(value);
                }}
                asideComponent={aside}
                placeholder="Type to search..."
                label={label}
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
            }

            setSelectedItem(item);
        },
        [isOpen, onSelect]
    );

    const containerRef = dropdownController.controllerRef as React.MutableRefObject<HTMLDivElement | null>;
    return (
        <div className={styles.inputContainer} ref={containerRef}>
            <Dropdown controller={dropdownController}>
                <Menu
                    elevation={0}
                    onClick={select}
                    keyboardNavigationRef={inputRef.current}
                    sections={dropdownSections}
                    itemComponent={itemComponent}
                    asideComponent={asideComponent}
                />
            </Dropdown>
        </div>
    );
};

export default SearchableDropdown;
