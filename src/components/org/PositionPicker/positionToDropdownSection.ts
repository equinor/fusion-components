import { Position } from '@equinor/fusion';
import { SearchableDropdownOption } from '@equinor/fusion-components';

export const singlePositionToDropdownOption = (
    position: Position,
    selectedPosition: Position | null
): SearchableDropdownOption[] => {
    return positionsToDropdownOption([position], selectedPosition);
};

export const positionsToDropdownOption = (
    positions: Position[],
    selectedPosition: Position | null
): SearchableDropdownOption[] => {
    return positions.map(p => ({
        key: p.id,
        title: p.name,
        position: p,
        isSelected: selectedPosition !== null && selectedPosition.id === p.id,
    }));
};
