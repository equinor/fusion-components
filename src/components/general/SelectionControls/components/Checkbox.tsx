import { useRef, MutableRefObject, forwardRef, useEffect, MouseEvent } from 'react';

import styles from '../styles.less';
import { DoneIcon, MinimizeIcon } from '@equinor/fusion-components';
import classNames from 'classnames';
import { useComponentDisplayClassNames } from '@equinor/fusion';

type CheckboxProps = {
    selected?: boolean;
    onChange?: (e: MouseEvent<HTMLDivElement>) => void;
    disabled?: boolean;
    indeterminate?: boolean;
    color?: string;
};

/**
 * @deprecated
 * @see Link : {@link https://equinor.github.io/fusion-react-components/?path=/docs/input-checkbox--page}
 */
const Checkbox = forwardRef<HTMLInputElement | null, CheckboxProps>(
    ({ selected, onChange, disabled, indeterminate, color }, ref) => {
        const inputRef =
            (ref as MutableRefObject<HTMLInputElement | null>) || useRef<HTMLInputElement | null>();

        const containerClassNames = classNames(
            styles.container,
            styles.checkbox,
            useComponentDisplayClassNames(styles),
            {
                [styles.disabled]: disabled,
            }
        );

        useEffect(() => {
            if (inputRef.current) {
                inputRef.current.indeterminate = indeterminate ? true : false;
            }
        }, [indeterminate]);

        return (
            <div className={containerClassNames} onClick={onChange}>
                <input
                    type="checkbox"
                    checked={selected}
                    disabled={disabled}
                    readOnly
                    ref={inputRef}
                />
                <label style={{ borderColor: color, backgroundColor: color }}>
                    <span className={styles.checkmark}>
                        {indeterminate ? <MinimizeIcon /> : selected ? <DoneIcon /> : null}
                    </span>
                </label>
            </div>
        );
    }
);

export default Checkbox;
