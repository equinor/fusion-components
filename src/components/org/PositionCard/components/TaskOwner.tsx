import { useTooltipRef } from '@equinor/fusion-components';
import styles from '../styles.less';

// TODO: replace with FusionIcon
import clsx from 'clsx';
import Icon from '@equinor/fusion-react-icon';

type TaskOnwerProps = {
    highlightTaskOwner: boolean;
    inline: boolean;
};

const TaskOwner = ({ highlightTaskOwner, inline }: TaskOnwerProps): JSX.Element => {
    const taskOwnerRef = useTooltipRef('Task Owner', 'below');
    const stateIconStyles = clsx(styles.stateIconsHighlight, {
        [styles.inline]: inline,
    });
    return (
        <div className={stateIconStyles}>
            {highlightTaskOwner ? (
                <span ref={taskOwnerRef} className={styles.highligthTaskOwnerContainer}>
                    <Icon className={styles.highligthTaskOwnerIcon} icon="assignment_user" />
                </span>
            ) : (
                <span ref={taskOwnerRef} className={styles.edsIcon}>
                    <Icon className={styles.highligthTaskOwnerPadding} icon="assignment_user" />
                </span>
            )}
        </div>
    );
};
export default TaskOwner;
