import { useEffect, useState, useCallback } from 'react';
import { SearchableDropdown, SearchableDropdownOption } from '@equinor/fusion-components';
import { Position } from '@equinor/fusion';
import usePositionQuery from './hooks/usePositionQuery';
import ItemComponent from './components/ItemComponent';
import AsideComponent from './components/AsideComponent';
import {
    singlePositionToDropdownOption,
    positionsToDropdownOption,
} from './positionToDropdownSection';
import { PositionPickerContex } from './positionPickerContext';

type PositionPickerProps = {
    initialPosition?: Position;
    onSelect?: (position: Position) => void;
    projectId: string;
    contractId?: string;
    selectedPosition: Position | null;
    label?: string;
    placeholder?: string;
    allowFuture?: boolean;
    allowPast?: boolean;
};

const PositionPicker = ({
    initialPosition,
    selectedPosition,
    onSelect,
    projectId,
    contractId,
    label,
    placeholder,
    allowFuture,
    allowPast,
}: PositionPickerProps) => {
    const [options, setOptions] = useState<SearchableDropdownOption[]>([]);
    const [error, isFetching, filteredPositions, search] = usePositionQuery(
        selectedPosition,
        projectId,
        contractId,
        allowFuture,
        allowPast
    );
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
        (item) => {
            if (onSelect) {
                onSelect(item.position);
            }
        },
        [onSelect]
    );

    return (
        <PositionPickerContex.Provider value={{ allowFuture: allowFuture, allowPast: allowPast }}>
            <SearchableDropdown
                options={options}
                onSelect={handleSelect}
                itemComponent={ItemComponent}
                asideComponent={AsideComponent}
                onSearchAsync={setSearchQuery}
                label={label}
                placeholder={placeholder || 'Select position'}
            />
        </PositionPickerContex.Provider>
    );
};

export default PositionPicker;
