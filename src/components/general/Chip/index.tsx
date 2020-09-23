import { CloseIcon, useAnchor } from '@equinor/fusion-components';
import classNames from 'classnames';
import * as React from 'react';

import * as styles from './styles.less';

type ChipProps = {
    id?: string;
    isDisabled?: boolean;
    title: string;
    onRemove?: () => void;
    secondary?: boolean;
    primary?: boolean;
    quickFactScope?: string;
};

const Chip: React.FC<ChipProps> = ({
    id,
    isDisabled,
    onRemove,
    title,
    secondary,
    primary,
    quickFactScope,
}) => {
    const chipContainerClassNames = classNames(styles.chipContainer, {
        [styles.disabled]: isDisabled,
        [styles.secondary]: secondary,
        [styles.primary]: primary,
    });

    const ref = useAnchor<HTMLDivElement>({ id, scope: quickFactScope });

    return (
        <div className={chipContainerClassNames} ref={ref}>
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
