import { useTooltipRef } from '@equinor/fusion-components';
import styles from '../styles.less';

// TODO: replace with FusionIcon
import { IconType } from '@equinor/fusion-wc-icon';
import clsx from 'clsx';

type TaskOnwerProps = {
    highlightTaskOwner: boolean;
    inline: boolean;
};

const TaskOwner = ({ highlightTaskOwner, inline }: TaskOnwerProps): JSX.Element => {
    const taskOwnerRef = useTooltipRef('Task Owner', 'below');
    const stateIconStyles = clsx(styles.stateIcons, {
        [styles.inline]: inline,
    });
    return (
        <div className={stateIconStyles}>
            {highlightTaskOwner ? (
                <span ref={taskOwnerRef} className={styles.highligthTaskOwnerContainer}>
                    <span className={styles.highligthTaskOwnerIcon}>
                        <fwc-icon type={IconType.EDS} icon="assignment_user"></fwc-icon>
                    </span>
                </span>
            ) : (
                <span ref={taskOwnerRef} className={styles.edsIcon}>
                    <fwc-icon type={IconType.EDS} icon="assignment_user"></fwc-icon>
                </span>
            )}
        </div>
    );
};
export default TaskOwner;
