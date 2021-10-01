import { SplitPopover, usePopoverRef } from '@equinor/fusion-components';
import { FC, RefObject } from 'react';
import { TimelineSlotProps } from '../model';

import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            display: 'flex',
            width: '100%',
        },
    })
);

export const InfoSlot: FC<TimelineSlotProps> = ({ split, position }) => {
    const styles = useStyles();
    const [splitPopoverRef] = usePopoverRef(
        <SplitPopover split={split} position={position} />,
        { placement: 'below', justify: 'center' },
        true
    );
    return (
        <div className={styles.container} ref={splitPopoverRef as RefObject<HTMLDivElement>}>
            <span>{`${split?.workload || 0}%`}</span>
        </div>
    );
};
