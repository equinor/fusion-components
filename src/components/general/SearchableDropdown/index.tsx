import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import {
    TextInput,
    DropdownArrow,
    Menu,
    Dropdown,
    useDropdownController,
    useOverlayContainer,
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
    placeholder?: string;
    options?: SearchableDropdownOption[];
    sections?: SearchableDropdownSection[];
    error?: boolean;
    errorMessage?: string;
    itemComponent?: any;
    asideComponent?: any;
    selectedComponent?: any;
    onSelect?: (item: SearchableDropdownOption) => void;
    onSearchAsync?: (query: string) => void;
    dropdownMaxHeight?: number;
};

const createSingleSectionFromOptions = (
    options: SearchableDropdownOption[]
): SearchableDropdownSection[] => [{ key: 'DropdownSection', items: options }];

const filterMultipleSections = (
    sections: SearchableDropdownSection[],
    query: string
): SearchableDropdownSection[] => {
    const newSections = sections.reduce(
        (acc: SearchableDropdownSection[], curr: SearchableDropdownSection) => {
            const items = curr.items.filter((option) =>
                option.title.toLowerCase().includes(query.toLowerCase())
            );

            if (!items.length) return acc;

            const newSection = { ...curr, items };
            acc.push(newSection);
            return acc;
        },
        []
    );

    return newSections;
};

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
    placeholder,
    onSelect,
    error,
    errorMessage,
    onSearchAsync,
    itemComponent,
    asideComponent,
    selectedComponent,
    dropdownMaxHeight,
}: SearchableDropdownProps) => {
    if ((!options && !sections) || (options && sections)) {
        throw new Error("You must supply only one of 'options', 'sections' props");
    }

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [dropdownSections, setDropdownSections] = useState<SearchableDropdownSection[]>([]);

    useEffect(() => {
        if (sections) {
            setDropdownSections(sections);
        } else if (options) {
            setDropdownSections(createSingleSectionFromOptions(options));
        }
    }, [options, sections]);

    const filterSearch = useCallback(
        (inputValue) => {
            if (onSearchAsync) {
                onSearchAsync(inputValue);
            } else {
                if (options) {
                    const newOptions = options.filter((option) =>
                        option.title.toLowerCase().includes(inputValue.toLowerCase())
                    );
                    setDropdownSections(createSingleSectionFromOptions(newOptions));
                } else if (sections) {
                    setDropdownSections(filterMultipleSections(sections, inputValue));
                }
            }
        },
        [options, onSearchAsync, sections]
    );

    useEffect(() => filterSearch(inputValue), [inputValue]);

    const dropdownController = useDropdownController((ref, isOpen, setIsOpen) => {
        const selectedItem = useMemo(() => {
            const mergedItems = mergeDropdownSectionItems(dropdownSections);
            const selectedItem = mergedItems.find((option) => option.isSelected === true);
            return selectedItem;
        }, [dropdownSections]);

        const selectedValue = useMemo(() => {
            if (isOpen) {
                return inputValue;
            } else if (selectedItem) {
                return selectedItem.title;
            }
            return '';
        }, [isOpen, inputValue, selectedItem]);

        const aside = useMemo(() => {
            if (asideComponent && !isOpen && selectedItem) {
                const AsideComponent = asideComponent;
                return (
                    <aside>
                        <AsideComponent item={selectedItem} />
                    </aside>
                );
            }

            return null;
        }, [isOpen, asideComponent, selectedItem]);

        const selected = useMemo(() => {
            if (selectedComponent && !isOpen) {
                const SelectedComponent = selectedComponent;
                return (
                    <div className={styles.buttonContainer}>
                        <div onClick={() => setIsOpen(!isOpen)} className={styles.buttonContent}>
                            {aside}
                            <div className={styles.selectedItem}>
                                <SelectedComponent item={selectedItem} />
                            </div>
                            <div className={styles.dropDownArrow}>
                                <DropdownArrow cursor="pointer" isOpen={isOpen} />
                            </div>
                        </div>
                    </div>
                );
            }
        }, [isOpen, setIsOpen, selectedComponent, selectedItem, aside]);

        const overlayContainer = useOverlayContainer();
        const handleBlur = useCallback(
            (e: React.FocusEvent<HTMLInputElement>) => {
                if (overlayContainer.contains(e.relatedTarget as HTMLElement)) return;
                setIsOpen(false, 250);
            },
            [isOpen, overlayContainer]
        );

        return (
            <>
                {!isOpen && selectedComponent && selectedItem ? (
                    selected
                ) : (
                    <TextInput
                        onChange={(value) => {
                            !open && setIsOpen(true);
                            setInputValue(value);
                        }}
                        error={error && !isOpen}
                        errorMessage={errorMessage}
                        asideComponent={aside}
                        placeholder={placeholder || 'Type to search...'}
                        label={label}
                        icon={<DropdownArrow cursor="pointer" isOpen={isOpen} />}
                        onIconAction={() => isOpen && setIsOpen(false)}
                        onClick={() => !isOpen && setIsOpen(true)}
                        value={selectedValue}
                        ref={inputRef}
                        onKeyUp={(e) => e.keyCode === 27 && setIsOpen(false)}
                        onFocus={() => !isOpen && setIsOpen(true)}
                        onBlur={handleBlur}
                    />
                )}
            </>
        );
    });

    const { isOpen, setIsOpen } = dropdownController;
    const select = useCallback(
        (item) => {
            onSelect && onSelect(item);
            if (isOpen) {
                setIsOpen(false);
                setInputValue('');
            }
        },
        [isOpen, onSelect]
    );

    const containerRef = dropdownController.controllerRef as React.MutableRefObject<HTMLDivElement | null>;

    const hasResults = useMemo(() => {
        return (
            dropdownSections.reduce<SearchableDropdownOption[]>(
                (items, section) => [...items, ...section.items],
                []
            ).length > 0
        );
    }, [dropdownSections]);

    return (
        <div ref={containerRef}>
            <Dropdown controller={dropdownController}>
                <div
                    className={styles.menuContainer}
                    style={dropdownMaxHeight ? { maxHeight: `${dropdownMaxHeight}px` } : {}}
                >
                    {hasResults ? (
                        <Menu
                            elevation={0}
                            onClick={select}
                            keyboardNavigationRef={inputRef.current}
                            sections={dropdownSections}
                            itemComponent={itemComponent}
                            asideComponent={asideComponent}
                        />
                    ) : (
                        <div className={styles.noResultsContainer}>
                            {inputValue ? (
                                <span>
                                    No matches for <strong> {inputValue}</strong>
                                </span>
                            ) : (
                                'Start typing to search'
                            )}
                        </div>
                    )}
                </div>
            </Dropdown>
        </div>
    );
};

export default SearchableDropdown;
