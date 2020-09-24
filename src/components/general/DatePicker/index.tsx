import { Month, dateMask, formatDate, parseDate } from '@equinor/fusion';
import {
    Calendar,
    CalendarIcon,
    Dropdown,
    TextInput,
    unmaskString,
    useDropdownController,
    useOverlayContainer,
    useStringMask,
    useAnchorRef,
} from '@equinor/fusion-components';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

type DatePickerProps = {
    id?: string;
    disabled?: boolean;
    error?: boolean;
    errorMessage?: string;
    label?: string;
    selectedDate?: null | Date;
    onChange: (date: null | Date) => void;
    quickFactScope?: string;
};

const DatePicker: React.FC<DatePickerProps> = ({
    id = 'datepicker',
    disabled,
    error,
    errorMessage,
    label,
    onChange,
    selectedDate,
    quickFactScope,
}) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [maskedValue, isValidMask] = useStringMask(dateMask, inputValue);

    const dropdownController = useDropdownController((ref, isOpen, setIsOpen) => {
        const value = useMemo(() => {
            if (!selectedDate || isOpen) {
                return maskedValue;
            }

            return formatDate(selectedDate);
        }, [selectedDate, isOpen, maskedValue]);

        const handleKeyUp = useCallback(
            (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.keyCode === 13 && isValidMask) {
                    try {
                        const parsedDate = parseDate(maskedValue);
                        onChange(parsedDate);
                        setIsOpen(false);
                    } catch (e) {}
                } else if (e.keyCode === 27) {
                    setIsOpen(false);
                }
            },
            [isValidMask, onChange]
        );

        const overlayContainer = useOverlayContainer();
        const handleBlur = useCallback(
            (e: React.FocusEvent<HTMLInputElement>) => {
                if (isOpen && !overlayContainer.contains(e.relatedTarget as HTMLElement)) {
                    setIsOpen(false);
                }
            },
            [isOpen]
        );

        return (
            <TextInput
                disabled={disabled}
                error={error}
                errorMessage={errorMessage}
                icon={<CalendarIcon />}
                label={label}
                onBlur={handleBlur}
                onChange={(value) => setInputValue(unmaskString(dateMask, value))}
                onClick={() => !isOpen && !disabled && setIsOpen(true)}
                onIconAction={() => isOpen && setIsOpen(false)}
                onKeyUp={handleKeyUp}
                placeholder={selectedDate ? formatDate(selectedDate) : 'dd/mm/yyyy'}
                value={value}
            />
        );
    });

    useEffect(() => {
        if (!dropdownController.isOpen) {
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

    useAnchorRef({
        ref: dropdownController.controllerRef,
        id,
        scope: quickFactScope,
    });

    return (
        <div
            ref={dropdownController.controllerRef as React.MutableRefObject<HTMLDivElement | null>}
        >
            <Dropdown controller={dropdownController}>
                <Calendar
                    initialMonth={today.getMonth() as Month}
                    initialYear={today.getFullYear()}
                    interactive
                    onChange={onDatePickerChange}
                    selectedDate={selectedDate}
                />
            </Dropdown>
        </div>
    );
};

export default DatePicker;
