import { Position } from '@equinor/fusion';
import { SearchableDropdownOption } from '@equinor/fusion-components';

export const singlePositionToDropdownOption = (position: Position): SearchableDropdownOption[] => {
    const items = [position].map(p => ({
        key: p.id,
        title: p.name,
    }));
    return items;
};
