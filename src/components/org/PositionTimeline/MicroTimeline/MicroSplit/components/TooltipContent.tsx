import { formatDate } from '@equinor/fusion';
import { FC } from 'react';
import { TimelineSplit } from '../../../model';

type TooltipContentProps = {
    split: TimelineSplit;
};

export const TooltipContent: FC<TooltipContentProps> = ({ split }) => {
    return (
        <>
            <span>
                {split?.assignedPerson?.name || 'TBN'}
                <br /> {formatDate(split.appliesFrom)} - {formatDate(split.appliesTo)} (
                {split.workload || 0}%)
            </span>
            <br />
        </>
    );
};
