import { useCallback, MutableRefObject, forwardRef } from 'react';
import styles from '../styles.less';
import classNames from 'classnames';
import { useComponentDisplayClassNames } from '@equinor/fusion';

type RadioProps = {
    selected?: boolean;
    onChange?: () => void;
    disabled?: boolean;
    color?: string;
};

/**
 * @deprecated
 * @see Link : {@link https://equinor.github.io/fusion-react-components/?path=/docs/input-radio--page}
 */
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

        const handleOnChange = useCallback(() => {
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
