import { Position } from '@equinor/fusion';
import { SearchableDropdownOption } from 'components/general/SearchableDropdown';

export const singlePositionToDropdownOption = (
    query: string,
    position: Position,
    selectedPosition: Position | null
): SearchableDropdownOption[] => {
    return positionsToDropdownOption(query, [position], selectedPosition);
};

const createPositionTitle = (position: Position) => {
    if (!position.externalId) {
        return position.name;
    }

    return `${position.externalId} - ${position.name}`;
};

export const positionsToDropdownOption = (
    query: string,
    positions: Position[],
    selectedPosition: Position | null
): SearchableDropdownOption[] => {
    if (selectedPosition !== null && !positions.find(p => p.id === selectedPosition.id)) {
        positions = [selectedPosition, ...positions];
    }

    if (positions.length === 0) {
        return [
            {
                key: 'empty',
                title: query && query.length > 0 ? 'No results' : 'Start typing to search',
                isDisabled: true,
            },
        ];
    }

    return positions.map(p => ({
        key: p.id,
        title: createPositionTitle(p),
        position: p,
        isSelected: selectedPosition !== null && selectedPosition.id === p.id,
    }));
};
