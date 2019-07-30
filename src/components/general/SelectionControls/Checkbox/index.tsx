import React, { useRef, MutableRefObject, forwardRef, useEffect } from 'react';
import styles from './styles.less';
import { DoneIcon, MinimizeIcon } from '@equinor/fusion-components';
import classNames from 'classnames';
import tinycolor from 'tinycolor2';
import { useColorOverrideFilter } from '../utils';

type CheckboxProps = {
    selected?: boolean;
    onChange?: (e: React.MouseEvent<HTMLDivElement>) => void;
    disabled?: boolean;
    indeterminate?: boolean;
    color?: string;
};

const Checkbox = forwardRef<HTMLInputElement | null, CheckboxProps>(
    ({ selected, onChange, disabled, indeterminate, color }, ref) => {
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

        const { hueFilter, slFilter } = useColorOverrideFilter(color);

        return (
            <div style={{ filter: hueFilter }} className={containerClassNames} onClick={onChange}>
                <input
                    type="checkbox"
                    checked={selected}
                    disabled={disabled}
                    readOnly
                    ref={inputRef}
                />
                <label style={{ filter: slFilter }}>
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
