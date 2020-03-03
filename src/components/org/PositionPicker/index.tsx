import React, { useEffect, useState, useCallback } from 'react';
import { SearchableDropdown, SearchableDropdownOption } from '@equinor/fusion-components';
import { Position } from '@equinor/fusion';
import usePositionQuery from './hooks/usePositionQuery';
import ItemComponent from './components/ItemComponent';
import AsideComponent from './components/AsideComponent';
import {
    singlePositionToDropdownOption,
    positionsToDropdownOption,
} from './positionToDropdownSection';

type PositionPickerProps = {
    initialPosition?: Position;
    onSelect?: (position: Position) => void;
    projectId: string;
    contractId?: string;
    selectedPosition: Position | null;
    label?: string;
};

const PositionPicker = ({
    initialPosition,
    selectedPosition,
    onSelect,
    projectId,
    contractId,
    label,
}: PositionPickerProps) => {
    const [options, setOptions] = useState<SearchableDropdownOption[]>([]);
    const [error, isFetching, filteredPositions, search] = usePositionQuery(selectedPosition, projectId, contractId);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (initialPosition) {
            setOptions(
                singlePositionToDropdownOption(searchQuery, initialPosition, selectedPosition)
            );
        }
    }, [initialPosition, selectedPosition]);

    useEffect(() => {
        search(searchQuery);
    }, [searchQuery, isFetching]);

    useEffect(() => {
        setOptions(positionsToDropdownOption(searchQuery, filteredPositions, selectedPosition));
    }, [filteredPositions, isFetching, selectedPosition]);

    const handleSelect = useCallback(
        item => {
            if (onSelect) {
                onSelect(item.position);
            }
        },
        [onSelect]
    );

    return (
        <SearchableDropdown
            options={options}
            onSelect={handleSelect}
            itemComponent={ItemComponent}
            asideComponent={AsideComponent}
            onSearchAsync={setSearchQuery}
            label={label || 'Select position'}
        />
    );
};

export default PositionPicker;
