import React, { useState, useRef, useCallback, FC, useEffect, useMemo } from 'react';
import {
    TextInput,
    DropdownArrow,
    Menu,
    useClickOutsideOverlayPortal,
    RelativeOverlayPortal,
} from '@equinor/fusion-components';
import styles from './styles.less';

export type DropdownOption = {
    title: string;
    key: string;
    isSelected?: boolean;
    isDisabled?: boolean;
};

type DropdownProps = {
    label?: string;
    options: DropdownOption[];
    onSelect?: (item: DropdownOption) => void;
};

const Dropdown: FC<DropdownProps> = ({ options, label, onSelect }) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [dropdownOptions, setDropdownOptions] = useState<DropdownOption[]>([]);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const inputContainerRef = useRef<HTMLDivElement | null>(null);

    const close = useCallback(() => open && setOpen(false), [open]);
    useClickOutsideOverlayPortal(close, inputContainerRef.current);

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

    const value = useMemo(() => {
        if (open) {
            return inputValue;
        }
        const selectedItem = options.find(option => option.isSelected === true);
        return selectedItem ? selectedItem.title : '';
    }, [open, inputValue, options]);

    const select = useCallback(item => {
        if (open) {
            onSelect && onSelect(item);
            setOpen(false);
            setInputValue('');
        }
    },[open, onSelect])

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
                value={value}
                ref={inputRef}
            />
            <RelativeOverlayPortal relativeRef={inputContainerRef} show={open}>
                <div className={styles.menuContainer}>
                    <Menu
                        onClick={select}
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
