import React, { forwardRef, MutableRefObject } from 'react';
import classNames from 'classnames';
import styles from './styles.less';
import { useElevationClassName } from '@equinor/fusion-components';

type SwitchProps = {
    active?: boolean;
    onChange?: () => void;
    disabled?: boolean;
};

const Switch = forwardRef<HTMLDivElement | null, SwitchProps>(
    ({ active, onChange, disabled }, ref) => {
        const switchRef = ref as MutableRefObject<HTMLInputElement | null>;

        const containerClassNames = classNames(styles.switchContainer, {
            [styles.disabled]: disabled,
        });

        const activatorClassNames = classNames(styles.activator, useElevationClassName(1));

        return(
            <div className={containerClassNames} onClick={onChange}>
                <input
                    type="checkbox"
                    checked={active}
                    disabled={disabled}
                    readOnly
                    ref={switchRef}
                />
                <label>
                    <span className={activatorClassNames} />
                </label>
            </div>
        )
    }
);

export default Switch;
