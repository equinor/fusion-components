import { FC } from 'react';
import { InfoSlotProps, TimelineSplit } from '../model';

export const InfoSlot: FC<InfoSlotProps<TimelineSplit>> = ({ item }) => {
    return <span>{`${item?.workload || 0}%`}</span>;
};
