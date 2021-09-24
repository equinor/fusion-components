import { PersonPhoto } from '@equinor/fusion-components';
import { FC } from 'react';
import { TimelineSlotProps } from '../model';

export const PersonSlot: FC<TimelineSlotProps> = ({ split }) => {
    return <PersonPhoto personId={split?.assignedPerson?.azureUniqueId} size="small" />;
};
