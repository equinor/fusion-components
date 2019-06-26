import * as React from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import { ErrorIcon } from 'index';

type TextInputProps = {
    disabled?: boolean;
    error?: boolean;
    errorMessage?: string;
    isOptional?: boolean;
    placeholder?: string;
    label?: string;
    helperText?: string;
    onChange: (newValue: string) => void;
    value?: string;
    icon?: React.ReactElement;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onIconAction?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const TextInput = React.forwardRef<HTMLInputElement | null,React.PropsWithChildren<TextInputProps>>(
    (
        {
            disabled = false,
            error,
            errorMessage,
            isOptional = false,
            placeholder = '',
            label,
            onChange,
            value = '',
            icon,
            onBlur,
            onIconAction,
            helperText = '',
            ...props
        },
        ref
    ) => {
        const [focus, setFocus] = React.useState(false);
        const inputRef =
            (ref as React.MutableRefObject<HTMLInputElement | null>) ||
            React.useRef<HTMLInputElement | null>(null);

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (!disabled) {
                const newValue = event.target.value;
                onChange(newValue);
            }
        };

        const setInputFocus = () => {
            if (inputRef.current && !disabled) {
                inputRef.current.focus();
                setFocus(true);
            }
        };
        const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
            if (!disabled) {
                setFocus(false);
                onBlur && onBlur(event);
            }
        };

        const inputLabel = label && <label>{label}</label>;

        const inputIcon = React.useMemo(() => {
            if (!error && !icon) {
                return null;
            }
            const inputIcon = error ? (
                <ErrorIcon outline={false} color="#FF3B3B" cursor="default" />
            ) : (
                icon
            );
            return (
                <div className={styles.icon} onClick={onIconAction}>
                    {inputIcon}
                </div>
            );
        }, [icon, error]);

        const inputHelperText = React.useMemo(() => {
            if (errorMessage && error) {
                return (
                    <div className={classNames(styles.helperText, styles.error)}>
                        {errorMessage}
                    </div>
                );
            }
            if (helperText || isOptional) {
                const optional =
                    helperText && isOptional ? ' - Optional' : isOptional ? 'Optional' : '';

                return <div className={styles.helperText}>{helperText + optional}</div>;
            }
            return null;
        }, [errorMessage, error, isOptional]);

        const inputContentClasses = classNames(styles.inputContent, {
            [styles.focus]: focus,
            [styles.error]: error,
            [styles.disabled]: disabled,
            [styles.labelLess]: !label
        });

        const inputTextContentClasses = classNames(styles.inputTextContent, {
            [styles.moveLabel]: (value.length && !disabled) || (focus && !disabled),
            [styles.disabled]: disabled,
            [styles.error]: error,
        });

        return (
            <div className={styles.inputContainer}>
                <div className={inputContentClasses} onClick={setInputFocus}>
                    <div className={inputTextContentClasses}>
                        {inputLabel}
                        <input
                            ref={inputRef}
                            placeholder={placeholder}
                            onBlur={handleBlur}
                            value={!disabled ? value : ''}
                            onChange={handleChange}
                            disabled={disabled}
                            {...props}
                        />
                    </div>
                    {inputIcon}
                </div>
                {inputHelperText}
            </div>
        );
    }
);

TextInput.displayName = 'TextInput';

export default TextInput;
