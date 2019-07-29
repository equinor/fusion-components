import React, { useRef, MutableRefObject, forwardRef, useEffect } from 'react';
import styles from './styles.less';
import { DoneIcon, MinimizeIcon } from 'index';
import classNames from 'classnames';

type CheckboxProps = {
    selected?: boolean;
    onChange?: () => void;
    disabled?: boolean;
    indeterminate?: boolean;
};

const Checkbox = forwardRef<HTMLInputElement | null, CheckboxProps>(
    ({ selected, onChange, disabled, indeterminate }, ref) => {
        const inputRef =
            (ref as MutableRefObject<HTMLInputElement | null>) || useRef<HTMLInputElement | null>();

        const containerClassNames = classNames(styles.checkboxContainer, {
            [styles.disabled]: disabled,
        });

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
                <label>
                    <span className={styles.checkmark}>
                        {indeterminate ? (
                            <MinimizeIcon width={16} height={16} />
                        ) : (
                            <DoneIcon width={16} height={16} />
                        )}
                    </span>
                </label>
            </div>
        );
    }
);

export default Checkbox;
