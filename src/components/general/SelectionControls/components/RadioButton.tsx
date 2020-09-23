import React, { MutableRefObject, forwardRef } from 'react';
import styles from '../styles.less';
import classNames from 'classnames';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import { useAnchor } from '@equinor/fusion-components';

type RadioProps = {
    id?: string;
    selected?: boolean;
    onChange?: () => void;
    disabled?: boolean;
    color?: string;
    quickFactScope?: string;
};

const Radio = forwardRef<HTMLInputElement | null, RadioProps>(
    ({ id, selected, onChange, disabled, color, quickFactScope }, ref) => {
        const inputRef = ref as MutableRefObject<HTMLInputElement | null>;
        const containerClassNames = classNames(
            styles.container,
            styles.radio,
            useComponentDisplayClassNames(styles),
            {
                [styles.disabled]: disabled,
            }
        );

        const anchorRef = useAnchor<HTMLDivElement>({ id, scope: quickFactScope });

        const handleOnChange = React.useCallback(() => {
            if (!disabled && onChange) {
                onChange();
            }
        }, [disabled, onChange]);

        return (
            <div className={containerClassNames} onClick={handleOnChange}>
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
