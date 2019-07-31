import React, { MutableRefObject, forwardRef } from 'react';
import styles from '../styles.less';
import classNames from 'classnames';
import { useComponentDisplayClassNames } from '@equinor/fusion';

type RadioProps = {
    selected?: boolean;
    onChange?: () => void;
    disabled?: boolean;
    color?: string;
};

const Radio = forwardRef<HTMLInputElement | null, RadioProps>(
    ({ selected, onChange, disabled, color }, ref) => {
        const inputRef = ref as MutableRefObject<HTMLInputElement | null>;
        const containerClassNames = classNames(
            styles.container,
            styles.radio,
            useComponentDisplayClassNames(styles),
            {
                [styles.disabled]: disabled,
            }
        );

        return (
            <div className={containerClassNames} onClick={onChange}>
                <input
                    type="radio"
                    checked={selected}
                    disabled={disabled}
                    readOnly
                    ref={inputRef}
                />
                <label style={{ borderColor: color }}>
                    <span className={styles.dot} style={{ backgroundColor: color }} />
                </label>
            </div>
        );
    }
);

export default Radio;
