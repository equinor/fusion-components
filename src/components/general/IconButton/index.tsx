import React from 'react';
import classNames from 'classnames';

import styles from './styles.less';
import { useComponentDisplayType, ComponentDisplayType } from '@equinor/fusion';

type IconButtonProps = {
    active?: boolean;
    toggler?: boolean;
};

const IconButton: React.FC<IconButtonProps> = ({ active, toggler, children }) => {
    const displayType = useComponentDisplayType();
    const buttonClassNames = classNames(styles.container, {
        [styles.compact]: displayType === ComponentDisplayType.Compact,
        [styles.comfortable]: displayType === ComponentDisplayType.Comfortable,
        [styles.isToggler]: toggler,
        [styles.isActive]: toggler && active,
    });

    return (
        <button className={buttonClassNames}>
            <span className={styles.iconContainer}>{children}</span>
        </button>
    );
};

export default IconButton;
