import { CloseIcon, IconButton } from '@equinor/fusion-components';
import * as React from 'react';

import * as styles from "./styles.less";

interface IChipProps {
    onRemove: () => void,
    title: string
}

const Chip: React.FC<IChipProps> = ({ onRemove, title }) => {
    return (
        <div className={styles.chipContainer}>
            <div className={styles.chip}>
                <p className={styles.title}>{title}</p>
                {onRemove &&
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