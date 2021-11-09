import { FC } from 'react';
import { TimelineSlotProps } from '../model';
import { Checkbox } from '@equinor/fusion-react-checkbox';

export const ActionSlot: FC<TimelineSlotProps> = ({ isSelected, isDisabled }) => {
    if (isDisabled) return null;
    return <Checkbox checked={isSelected} />;
};
