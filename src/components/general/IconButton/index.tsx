import React, { forwardRef, PropsWithChildren, MutableRefObject, useRef, MouseEvent } from 'react';
import classNames from 'classnames';

import styles from './styles.less';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import { useAnchorRef } from '../ApplicationGuidance/components/Anchor';

type IconButtonProps = {
    id?: string;
    active?: boolean;
    toggler?: boolean;
    disabled?: boolean;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    quickFactScope?: string;
};

const IconButton = forwardRef<HTMLButtonElement | null, PropsWithChildren<IconButtonProps>>(
    ({ id, active, toggler, disabled, quickFactScope, children, ...props }, ref) => {
        const buttonClassNames = classNames(
            styles.container,
            useComponentDisplayClassNames(styles),
            {
                [styles.isToggler]: toggler,
                [styles.isActive]: active,
                [styles.isDisabled]: disabled,
                ['isActive']: active,
            }
        );

        const buttonRef =
            (ref as MutableRefObject<HTMLButtonElement | null>) ||
            useRef<HTMLButtonElement | null>(null);

        useAnchorRef({ ref: buttonRef, id, scope: quickFactScope });

        return (
            <button
                ref={buttonRef}
                className={buttonClassNames}
                disabled={disabled}
                onMouseDown={(e) => e.preventDefault()}
                {...props}
            >
                <span className={styles.iconContainer}>{children}</span>
            </button>
        );
    }
);

export default IconButton;
