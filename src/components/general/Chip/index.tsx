import { CloseIcon } from '@equinor/fusion-components';
import classNames from 'classnames';
import * as React from 'react';

import * as styles from "./styles.less";

type ChipProps = {
    isDisabled?: boolean,
    title: string
    onRemove?: () => void,
    secondary?: boolean;
    primary?: boolean;
}

const Chip: React.FC<ChipProps> = ({ isDisabled, onRemove, title, secondary, primary }) => {

    const chipContainerClassNames = classNames(
        styles.chipContainer,
        {
            [styles.disabled]: isDisabled,
            [styles.secondary]: secondary,
            [styles.primary]: primary
        }
    );

    return (
        <div className={chipContainerClassNames}>
            <div className={styles.chip}>
                <p className={styles.title}>{title}</p>
                {(onRemove && !isDisabled) &&
                    <div className={styles.removeButton} onClick={onRemove}>
                        <CloseIcon
                            height={16}
                            width={16}
                        />
                    </div>
                }
            </div>
        </div>
    )
}

export default Chip;