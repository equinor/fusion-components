import { FC } from 'react';
import { TimelineSlotProps } from '../model';

export const InfoSlot: FC<TimelineSlotProps> = ({ split }) => {
    return <span>{`${split?.workload || 0}%`}</span>;
};
