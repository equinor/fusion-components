import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { dateMask, formatDate, parseDate, Month } from '@equinor/fusion';
import {
    Dropdown,
    useDropdownController,
    TextInput,
    useStringMask,
    unmaskString,
    Calendar,
    CalendarIcon,
} from '@equinor/fusion-components';

type DatePickerProps = {
    label?: string;
    selectedDate?: Date | null;
    onChange: (date: Date | null) => void;
};

const DatePicker: React.FC<DatePickerProps> = ({ label, selectedDate, onChange }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [maskedValue, isValidMask] = useStringMask(dateMask, inputValue);

    const dropdownController = useDropdownController((ref, isOpen, setIsOpen) => {
        const value = useMemo(() => {
            if (!selectedDate || isOpen) {
                return maskedValue;
            }

            return formatDate(selectedDate);
        }, [selectedDate, isOpen, maskedValue]);

        const handleKeyUp = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
            if(e.keyCode === 13 && isValidMask) {
                try {
                    const parsedDate = parseDate(maskedValue);
                    onChange(parsedDate);
                    setIsOpen(false);
                } catch (e) {}
            } else if(e.keyCode === 27) {
                setIsOpen(false);
            }
        }, [isValidMask, onChange]);

        return (
            <TextInput
                value={value}
                onChange={value => setInputValue(unmaskString(dateMask, value))}
                onIconAction={() => isOpen && setIsOpen(false)}
                onClick={() => !isOpen && setIsOpen(true)}
                icon={<CalendarIcon />}
                label={label}
                placeholder={selectedDate ? formatDate(selectedDate) : 'dd/mm/yyyy'}
                onKeyUp={handleKeyUp}
            />
        );
    });

    useEffect(() => {
        if(!dropdownController.isOpen) {
            setInputValue('');
        }
    }, [dropdownController.isOpen]);

    const onDatePickerChange = useCallback(
        (date: Date) => {
            onChange(date);
            dropdownController.setIsOpen(false);
        },
        [onChange, dropdownController.setIsOpen]
    );

    const today = new Date();

    return (
        <div
            ref={dropdownController.controllerRef as React.MutableRefObject<HTMLDivElement | null>}
        >
            <Dropdown controller={dropdownController}>
                <Calendar
                    selectedDate={selectedDate}
                    initialYear={today.getFullYear()}
                    initialMonth={today.getMonth() as Month}
                    interactive
                    onChange={onDatePickerChange}
                />
            </Dropdown>
        </div>
    );
};

export default DatePicker;
