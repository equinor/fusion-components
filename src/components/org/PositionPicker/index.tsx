import React, { useEffect, useState, useCallback } from 'react';
import {
    PersonPhoto,
    SearchableDropdownWrapper,
    SearchableDropdownOption,
} from '@equinor/fusion-components';
import { Position } from '@equinor/fusion';
import { singlePositionToDropdownOption } from './positionToDropdownSection';

type PersonPickerProps = {
    initialPosition?: Position;
    onSelect?: (position: Position) => void;
};

const PositionPicker = ({ initialPosition, onSelect }: PersonPickerProps) => {
    const [isInitialized, setInitialized] = useState(false);
    const [options, setOptions] = useState<SearchableDropdownOption[]>([]);
    const [selectedPositionId, setSelectedPositionId] = useState('');

    useEffect(() => {
        if (initialPosition && !isInitialized) {
            setOptions(singlePositionToDropdownOption(initialPosition));
        }
    }, [isInitialized, initialPosition]);

    const handleSelect = useCallback(
        item => {
            setSelectedPositionId(item.key);

            if (onSelect) {
                onSelect(item.person);
            }
        },
        [onSelect]
    );

    return (
        <SearchableDropdownWrapper
            options={options}
            label="Select position"
            onSelect={handleSelect}
        />
    );
};

export default PositionPicker;
