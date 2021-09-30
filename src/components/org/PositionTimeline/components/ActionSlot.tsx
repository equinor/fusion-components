import { FC } from 'react';
import { TimelineSlotProps } from '../model';
import { Checkbox } from '@equinor/fusion-react-checkbox';

export const ActionSlot: FC<TimelineSlotProps> = ({ isSelected }) => {
    return <Checkbox checked={isSelected} />;
};
