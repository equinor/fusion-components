import React, { useState, useRef, useCallback, FC, useEffect, useMemo } from 'react';
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

type SearchableDropdownProps = {
    label?: string;
    options: SearchableDropdownOption[];
    onSelect?: (item: SearchableDropdownOption) => void;
};

const SearchableDropdown: FC<SearchableDropdownProps> = ({ options, label, onSelect }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [inputValue, setInputValue] = useState('');

    const [dropdownOptions, setDropdownOptions] = useState<SearchableDropdownOption[]>([]);

    useEffect(() => {
        setDropdownOptions(options);
    }, [options]);

    const filterSearch = useCallback(
        inputValue => {
            setDropdownOptions(
                options.filter(option =>
                    option.title.toLowerCase().includes(inputValue.toLowerCase())
                )
            );
        },
        [options]
    );

    useEffect(() => filterSearch(inputValue), [inputValue]);

    const dropdownController = useDropdownController((ref, isOpen, setIsOpen) => {
        const value = useMemo(() => {
            if (isOpen) {
                return inputValue;
            }
            const selectedItem = options.find(option => option.isSelected === true);
            return selectedItem ? selectedItem.title : '';
        }, [isOpen, inputValue, options]);

        return (
            <TextInput
                onChange={value => {
                    if (!isOpen) {
                        setIsOpen(true);
                        return;
                    }
                    setInputValue(value);
                }}
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
                    sections={[
                        {
                            key: 'DropdownSelection',
                            items: dropdownOptions,
                        },
                    ]}
                />
            </Dropdown>
        </div>
    );
};

export default SearchableDropdown;
