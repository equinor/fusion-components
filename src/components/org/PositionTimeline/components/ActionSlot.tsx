import { FC } from 'react';
import { ActionSlotProps } from '../model';
import { Checkbox } from '@equinor/fusion-react-checkbox';

export const ActionSlot: FC<ActionSlotProps<boolean>> = ({ value }) => {
    return <Checkbox checked={value} />;
};
