import { PersonPhoto } from '@equinor/fusion-components';
import { FC } from 'react';
import { PersonSlotProps, TimelineSplit } from '../model';

export const PersonSlot: FC<PersonSlotProps<TimelineSplit>> = ({ item }) => {
    return <PersonPhoto personId={item?.assignedPerson?.azureUniqueId} size="small" />;
};
