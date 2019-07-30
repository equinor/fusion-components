import React, { useState, useRef } from 'react';
import { TextInput, DropArrow, Menu } from '@equinor/fusion-components';

const Dropdown = () => {
    const [open, setOpen] = useState(false);
    const [dropdownValue, setDropdownValue] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);
    return (
        <div>
            <TextInput
                onChange={() => setOpen(!open)}
                label="Dropdown"
                icon={<DropArrow cursor="pointer" direction={open ? 'up' : 'down'} />}
                onIconAction={() => setOpen(!open)}
                value={dropdownValue}
            />
            <Menu
                onClick={item => setDropdownValue("item")}
                keyboardNavigationRef={inputRef}
                sections={[
                    {
                        key: 'This is the only section, but I still need a key',
                        items: [
                            {
                                key: '1',
                                title: 'First',
                            },
                            {
                                key: '2',
                                title: 'Selected',
                                isSelected: true,
                            },
                            {
                                key: '3',
                                title: 'Disabled',
                                isDisabled: true,
                            },
                            {
                                key: '4',
                                title: 'Last',
                            },
                        ],
                    },
                ]}
            />
        </div>
    );
};

export default Dropdown;
