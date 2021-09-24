import { PersonPhoto } from '@equinor/fusion-components';
import { FC } from 'react';
import { PersonSlotProps } from '../model';

export const PersonSlot: FC<PersonSlotProps> = ({ item }) => {
    return <PersonPhoto personId={item?.assignedPerson?.azureUniqueId} size="small" />;
};
