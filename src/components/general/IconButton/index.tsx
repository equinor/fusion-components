import React, { forwardRef, PropsWithChildren, MutableRefObject, useRef, MouseEvent } from 'react';
import classNames from 'classnames';

import styles from './styles.less';
import { useComponentDisplayType, ComponentDisplayType } from '@equinor/fusion';

type IconButtonProps = {
    active?: boolean;
    toggler?: boolean;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const IconButton = forwardRef<HTMLButtonElement | null, PropsWithChildren<IconButtonProps>>(
    ({ active, toggler, children, ...props }, ref) => {
        const displayType = useComponentDisplayType();
        const buttonClassNames = classNames(styles.container, {
            [styles.compact]: displayType === ComponentDisplayType.Compact,
            [styles.comfortable]: displayType === ComponentDisplayType.Comfortable,
            [styles.isToggler]: toggler,
            [styles.isActive]: active,
            ["isActive"]: active,
        });

        const buttonRef =
            (ref as MutableRefObject<HTMLButtonElement | null>) ||
            useRef<HTMLButtonElement | null>(null);

        return (
            <button ref={buttonRef} className={buttonClassNames} {...props}>
                <span className={styles.iconContainer}>{children}</span>
            </button>
        );
    }
);

export default IconButton;
