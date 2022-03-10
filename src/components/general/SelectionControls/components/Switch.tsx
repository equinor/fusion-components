import { forwardRef, MutableRefObject } from 'react';
import classNames from 'classnames';
import styles from '../styles.less';
import { useElevationClassName } from '@equinor/fusion-components';
import { useComponentDisplayClassNames } from '@equinor/fusion';

type SwitchProps = {
    active?: boolean;
    onChange?: () => void;
    disabled?: boolean;
};

/**
 * @deprecated
 * @see Link : {@link https://equinor.github.io/fusion-react-components/?path=/docs/input-switch--page}
 */
const Switch = forwardRef<HTMLDivElement | null, SwitchProps>(
    ({ active, onChange, disabled }, ref) => {
        const switchRef = ref as MutableRefObject<HTMLInputElement | null>;

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
        );
    }
);

export default Switch;
