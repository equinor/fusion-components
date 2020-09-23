import React, { forwardRef, MutableRefObject } from 'react';
import classNames from 'classnames';
import styles from '../styles.less';
import { useElevationClassName } from '@equinor/fusion-components';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import { useAnchor } from '../../ApplicationGuidance';

type SwitchProps = {
    id?: string;
    active?: boolean;
    onChange?: () => void;
    disabled?: boolean;
    quickFactScope?: string;
};

const Switch = forwardRef<HTMLDivElement | null, SwitchProps>(
    ({ id, active, onChange, disabled, quickFactScope }, ref) => {
        const switchRef = ref as MutableRefObject<HTMLInputElement | null>;

        const anchorRef = useAnchor<HTMLDivElement>({ id, scope: quickFactScope });

        const containerClassNames = classNames(
            styles.container,
            styles.switch,
            useComponentDisplayClassNames(styles),
            {
                [styles.disabled]: disabled,
            }
        );

        const activatorClassNames = classNames(styles.activator, useElevationClassName(2));

        return (
            <div className={containerClassNames} onClick={onChange} ref={anchorRef}>
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
        );
    }
);

export default Switch;
