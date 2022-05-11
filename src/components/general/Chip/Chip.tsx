import { CloseIcon } from '@equinor/fusion-components';
import classNames from 'classnames';
import { FC } from 'react';
import { useStyles } from './Chip.style';

type ChipProps = {
    isDisabled?: boolean;
    title: string;
    onRemove?: () => void;
    secondary?: boolean;
    primary?: boolean;
};

export const Chip: FC<ChipProps> = ({ isDisabled, onRemove, title, secondary, primary }) => {
    const styles = useStyles();
    const chipContainerClassNames = classNames(styles.chipContainer, {
        [styles.disabled]: isDisabled,
        [styles.secondary]: secondary,
        [styles.primary]: primary,
    });

    return (
        <div className={chipContainerClassNames}>
            <div className={styles.chip}>
                <p className={styles.title}>{title}</p>
                {onRemove && !isDisabled && (
                    <div className={styles.removeButton} onClick={onRemove}>
                        <CloseIcon height={16} width={16} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chip;
