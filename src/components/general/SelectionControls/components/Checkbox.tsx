import React, { useRef, MutableRefObject, forwardRef, useEffect } from 'react';
import styles from '../styles.less';
import { DoneIcon, MinimizeIcon } from '@equinor/fusion-components';
import classNames from 'classnames';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import { useAnchor } from '../../ApplicationGuidance';

type CheckboxProps = {
    id?: string;
    selected?: boolean;
    onChange?: (e: React.MouseEvent<HTMLDivElement>) => void;
    disabled?: boolean;
    indeterminate?: boolean;
    color?: string;
    quickFactScope?: string;
};

const Checkbox = forwardRef<HTMLInputElement | null, CheckboxProps>(
    (
        { id = 'checkbox', selected, onChange, disabled, indeterminate, color, quickFactScope },
        ref
    ) => {
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
            <div
                className={containerClassNames}
                onClick={onChange}
                ref={useAnchor({ id, scope: quickFactScope })}
            >
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
