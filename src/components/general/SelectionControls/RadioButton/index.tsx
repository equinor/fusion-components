import React, { MutableRefObject, forwardRef } from 'react';
import styles from './styles.less';
import classNames from 'classnames';

type RadioProps = {
    selected?: boolean;
    onChange?: () => void;
    disabled?: boolean;
};

const Radio = forwardRef<HTMLInputElement | null, RadioProps>(
    ({ selected, onChange, disabled }, ref) => {

        const inputRef = ref as MutableRefObject<HTMLInputElement | null>;
        const containerClassNames = classNames(styles.radioButtonContainer, {
            [styles.disabled]: disabled,
        });

        return (
            <div className={containerClassNames} onClick={onChange}>
                <input
                    type="radio"
                    checked={selected}
                    disabled={disabled}
                    readOnly
                    ref={inputRef}
                />
                <label>
                    <span className={styles.dot} />
                </label>
            </div>
        );
    }
);

export default Radio;
