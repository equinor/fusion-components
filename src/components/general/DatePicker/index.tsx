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
    useOverlayContainer,
} from '@equinor/fusion-components';

type DatePickerProps = {
    error?: boolean;
    errorMessage?: string;
    label?: string;
    onChange: (date: Date | null) => void;
    selectedDate?: Date | null;
};

const DatePicker: React.FC<DatePickerProps> = ({ error, errorMessage, label, selectedDate, onChange  }) => {
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
        
        const overlayContainer = useOverlayContainer();
        const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
            if(isOpen && !overlayContainer.contains(e.relatedTarget as HTMLElement)) {
                setIsOpen(false);
            }
        }, [isOpen]);


        return (
            <TextInput
                error={error}
                errorMessage={errorMessage}
                icon={<CalendarIcon />}
                label={label}
                onChange={value => setInputValue(unmaskString(dateMask, value))}
                onClick={() => !isOpen && setIsOpen(true)}
                onIconAction={() => isOpen && setIsOpen(false)}
                onKeyUp={handleKeyUp}
                placeholder={selectedDate ? formatDate(selectedDate) : 'dd/mm/yyyy'}
                value={value}
                onBlur={handleBlur}
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
