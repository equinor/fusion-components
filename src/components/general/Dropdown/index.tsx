import React, { useState, useRef, useCallback } from 'react';
import {
    TextInput,
    DropdownArrow,
    Menu,
    useClickOutsideOverlayPortal,
    useRelativePortal,
} from '@equinor/fusion-components';
import styles from './styles.less';

type DropdownSelections = {
    title: string;
    key: string;
};

type DropdownProps = {
    label?: string;
    selections: DropdownSelections[];
    onSelect?: (item: DropdownSelections) => void;
    selected?: string;
};

const Dropdown: React.FC<DropdownProps> = ({ selections, label, onSelect, selected }) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [dropdownSelections, setDropdownSelections] = useState(selections);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const inputContainerRef = useRef<HTMLDivElement | null>(null);

    const close = useCallback(() => open && setOpen(false), [open]);

    const filterSearch = useCallback(inputValue => {
        setDropdownSelections(
            selections.filter(selection =>
                selection.title.toLowerCase().includes(inputValue.toLowerCase())
            )
        );
    }, []);

    useClickOutsideOverlayPortal(close, inputContainerRef.current);

    useRelativePortal(
        <div className={styles.menuContainer}>
            <Menu
                onClick={item => {
                    onSelect && onSelect(item);
                    setOpen(false);
                }}
                keyboardNavigationRef={inputRef.current}
                sections={[
                    {
                        key: 'DropdownSelection',
                        items: dropdownSelections,
                    },
                ]}
            />
        </div>,
        inputContainerRef,
        open
    );
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
        </div>
    );
};

export default Dropdown;
