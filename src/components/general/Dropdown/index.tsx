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
    const [dropdownOption, setDropdownOption] = useState<DropdownOption[]>([]);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const inputContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => setDropdownOption(options), [options])

    const close = useCallback(() => open && setOpen(false), [open]);

    const filterSearch = useCallback(inputValue => {
        setDropdownOption(
            options.filter(option =>
                option.title.toLowerCase().includes(inputValue.toLowerCase())
            )
        );
    }, [options]);

    useClickOutsideOverlayPortal(close, inputContainerRef.current);

    return (
        <div className={styles.inputContainer} ref={inputContainerRef}>
            <TextInput
                onChange={value => {
                    if (!open) {
                        setOpen(true);
                        return;
                    }
                    setInputValue(value);
                    filterSearch(value);
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
                                onSelect && onSelect(item);
                                setOpen(false);
                            }
                        }}
                        keyboardNavigationRef={inputRef.current}
                        sections={[
                            {
                                key: 'DropdownSelection',
                                items: dropdownOption,
                            },
                        ]}
                    />
                </div>
            </RelativeOverlayPortal>
        </div>
    );
};

export default Dropdown;
