import React, { forwardRef, MutableRefObject } from 'react';
import classNames from 'classnames';
import styles from './styles.less';
import { useElevationClassName } from 'index';

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
        const switchClassNames = classNames(styles.switch, {
            [styles.isActive]: active,
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
        // return (
        //     <div className={containerClassNames} onClick={onChange}>
        //         <div className={switchClassNames} ref={switchRef}>
        //             <div className={activatorClassNames} />
        //         </div>
        //     </div>
        // );
    }
);

export default Switch;
