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
} from '@equinor/fusion-components';
import { useCallback, useEffect, useMemo, useState, FC } from 'react';

type DatePickerProps = {
    disabled?: boolean;
    error?: boolean;
    errorMessage?: string;
    label?: string;
    selectedDate?: null | Date;
    onChange: (date: null | Date) => void;
};

const DatePicker: FC<DatePickerProps> = ({
    disabled,
    error,
    errorMessage,
    label,
    onChange,
    selectedDate,
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

        const tryParseDate = useCallback(() => {
            try {
                const parsedDate = parseDate(maskedValue);
                onChange(parsedDate);
            } catch (e) {}
        }, [maskedValue, parseDate]);

        const handleKeyUp = useCallback(
            (e: React.KeyboardEvent<HTMLInputElement>) => {
                if ((e.key === 'Enter' || e.key === 'Tab') && isValidMask) {
                    tryParseDate();
                    setIsOpen(false);
                } else if (e.key === 'Escape' || e.key === 'Esc') {
                    setIsOpen(false);
                }
            },
            [isValidMask, onChange, tryParseDate]
        );

        const overlayContainer = useOverlayContainer();
        const handleBlur = useCallback(
            (e: React.FocusEvent<HTMLInputElement>) => {
                if (isValidMask) {
                    tryParseDate();
                }
                if (isOpen && !overlayContainer.contains(e.relatedTarget as HTMLElement)) {
                    setIsOpen(false);
                }
            },
            [isOpen, tryParseDate, overlayContainer, isValidMask]
        );

        const handleClick = useCallback(() => !isOpen && !disabled && setIsOpen(true), [
            isOpen,
            disabled,
        ]);

        const handleInputChange = useCallback(
            (value: string) => setInputValue(unmaskString(dateMask, value)),
            [unmaskString]
        );

        const handleIconAction = useCallback(() => isOpen && setIsOpen(false), [isOpen]);

        const textInputPlaceholder = useMemo(
            () => (selectedDate ? formatDate(selectedDate) : 'dd/mm/yyyy'),
            [formatDate]
        );

        return (
            <TextInput
                disabled={disabled}
                error={error}
                errorMessage={errorMessage}
                icon={<CalendarIcon />}
                label={label}
                onBlur={handleBlur}
                onChange={handleInputChange}
                onClick={handleClick}
                onIconAction={handleIconAction}
                onKeyUp={handleKeyUp}
                placeholder={textInputPlaceholder}
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
