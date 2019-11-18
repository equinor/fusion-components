import { Position } from '@equinor/fusion';
import { SearchableDropdownOption } from '@equinor/fusion-components';

export const singlePositionToDropdownOption = (
    query: string,
    position: Position,
    selectedPosition: Position | null
): SearchableDropdownOption[] => {
    return positionsToDropdownOption(query, [position], selectedPosition);
};

export const positionsToDropdownOption = (
    query: string,
    positions: Position[],
    selectedPosition: Position | null
): SearchableDropdownOption[] => {
    if(selectedPosition !== null && !positions.find(p => p.id === selectedPosition.id)) {
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
        title: `${p.externalId} - ${p.name}`,
        position: p,
        isSelected: selectedPosition !== null && selectedPosition.id === p.id,
    }));
};
