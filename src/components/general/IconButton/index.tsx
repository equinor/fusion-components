import { forwardRef, PropsWithChildren, MutableRefObject, useRef, MouseEvent } from 'react';
import classNames from 'classnames';

import styles from './styles.less';
import { useComponentDisplayClassNames } from '@equinor/fusion';

type IconButtonProps = JSX.IntrinsicElements['button'] & {
    active?: boolean;
    toggler?: boolean;
    disabled?: boolean;
    //    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const IconButton = forwardRef<HTMLButtonElement | null, PropsWithChildren<IconButtonProps>>(
    ({ active, toggler, disabled, children, ...props }, ref) => {
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
