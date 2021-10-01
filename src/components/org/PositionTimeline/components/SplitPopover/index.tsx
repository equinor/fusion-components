import { FC } from 'react';
import { TimelinePosition, TimelineSplit } from '../../model';
import { useStyles } from './styles';
import { Icon } from '@equinor/fusion-react-icon';
import { formatDate } from '@equinor/fusion';
import { clsx } from '@equinor/fusion-react-styles';

type SplitPopoverProps = {
    position: TimelinePosition;
    split: TimelineSplit;
    customSlot?: JSX.Element;
};

export const SplitPopover: FC<SplitPopoverProps> = ({ position, split, customSlot }) => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <span className={styles.title}>{position.name}</span>
            <div className={styles.content}>
                <Icon icon="person" />
                <span className={styles.text}>{split?.assignedPerson?.name || 'TBN'}</span>
            </div>
            <div className={styles.content}>
                <Icon icon="calendar_date_range" />
                <span className={styles.text}>
                    {`${formatDate(split.appliesFrom)} - ${formatDate(split.appliesTo)}`}
                </span>
            </div>
            <div className={clsx(styles.content, styles.spaceBetween)}>
                <div className={styles.content}>
                    <Icon icon="work_outline" />
                    <span className={styles.text}>{`${split.workload || 0}%`}</span>
                </div>
                <div className={styles.content}>
                    <Icon icon="place" />
                    <span className={styles.text}>{split?.location?.name || 'No location'}</span>
                </div>
            </div>
            <div style={{ border: '1px solid #000' }}>{customSlot}</div>
        </div>
    );
};

export default SplitPopover;
