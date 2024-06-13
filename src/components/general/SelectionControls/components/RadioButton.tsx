import { useCallback, MutableRefObject, forwardRef } from 'react';
import { useStyles } from '../styles';
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
        const styles = useStyles();
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
