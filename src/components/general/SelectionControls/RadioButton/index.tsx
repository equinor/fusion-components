import React, { MutableRefObject, forwardRef } from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import { useColorOverrideFilter } from "../utils";
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
        const containerClassNames = classNames(styles.radioButtonContainer, useComponentDisplayClassNames(styles),{
            [styles.disabled]: disabled,
        });

        const { hueFilter, slFilter } = useColorOverrideFilter(color);

        return (
            <div style={{ filter: hueFilter }} className={containerClassNames} onClick={onChange}>
                <input
                    type="radio"
                    checked={selected}
                    disabled={disabled}
                    readOnly
                    ref={inputRef}
                />
                <label style={{ filter: slFilter }}>
                    <span className={styles.dot} />
                </label>
            </div>
        );
    }
);

export default Radio;
