import React, { useState, useRef, useCallback, FC, useEffect } from 'react';
import {
    TextInput,
    DropdownArrow,
    Menu,
    useClickOutsideOverlayPortal,
    RelativeOverlayPortal,
} from '@equinor/fusion-components';
import styles from './styles.less';

type DropdownOption = {
    title: string;
    key: string;
    isSelected?: boolean;
    isDisabled?: boolean;
};

type DropdownProps = {
    label?: string;
    options: DropdownOption[];
    onSelect?: (item: DropdownOption) => void;
    selected?: string;
};

const Dropdown: FC<DropdownProps> = ({ options, label, onSelect, selected }) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [dropdownOptions, setDropdownOptions] = useState<DropdownOption[]>([]);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const inputContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        !dropdownOptions.length && setDropdownOptions(options);
    }, [options]);

    const close = useCallback(() => open && setOpen(false), [open]);

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

    useClickOutsideOverlayPortal(close, inputContainerRef.current);

    const updateDropdownOptions = useCallback((item: DropdownOption) => {
        const newDropdownOptions = [...dropdownOptions];
        const currentSelectedIndex = dropdownOptions.findIndex(current => current.isSelected === true);
        if(currentSelectedIndex !== -1){
            newDropdownOptions[currentSelectedIndex].isSelected = false;
        };
        const newSelectedIndex = dropdownOptions.findIndex(current => current.key === item.key);
        if(newSelectedIndex !== -1){
            newDropdownOptions[newSelectedIndex].isSelected = true;
        };
        setDropdownOptions(newDropdownOptions);
    }, [dropdownOptions]);

    return (
        <div className={styles.inputContainer} ref={inputContainerRef}>
            <TextInput
                onChange={value => {
                    if (!open) {
                        setOpen(true);
                        return;
                    }
                    setInputValue(value);
                }}
                label={label}
                icon={<DropdownArrow cursor="pointer" isOpen={open} />}
                onIconAction={() => open && setOpen(false)}
                onClick={() => !open && setOpen(true)}
                value={open ? inputValue : selected}
                ref={inputRef}
            />
            <RelativeOverlayPortal relativeRef={inputContainerRef} show={open}>
                <div className={styles.menuContainer}>
                    <Menu
                        onClick={item => {
                            if (open) {
                                updateDropdownOptions(item);
                                onSelect && onSelect(item);
                                setOpen(false);
                            }
                        }}
                        keyboardNavigationRef={inputRef.current}
                        sections={[
                            {
                                key: 'DropdownSelection',
                                items: dropdownOptions,
                            },
                        ]}
                    />
                </div>
            </RelativeOverlayPortal>
        </div>
    );
};

export default Dropdown;
