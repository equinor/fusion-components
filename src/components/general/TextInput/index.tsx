import * as React from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import ErrorIcon from 'components/icons/components/alert/ErrorIcon';
import styling from 'styles/styling';

type TextInputProps = {
    disabled?: boolean;
    error?: boolean;
    errorMessage?: string;
    isOptional?: boolean;
    placeholder?: string;
    label?: string;
    asideComponent?: any;
    helperText?: string;
    onChange: (newValue: string) => void;
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    value?: string;
    icon?: React.ReactElement;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onIconAction?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const TextInput = React.forwardRef<
    HTMLInputElement | null,
    React.PropsWithChildren<TextInputProps>
>(
    (
        {
            disabled = false,
            error,
            errorMessage,
            isOptional = false,
            placeholder = '',
            label,
            asideComponent,
            onChange,
            onClick,
            value = '',
            icon,
            onBlur,
            onFocus,
            onIconAction,
            helperText = '',
            onKeyUp,
            ...props
        },
        ref
    ) => {
        const [focus, setFocus] = React.useState(false);
        const inputRef =
            (ref as React.MutableRefObject<HTMLInputElement | null>) ||
            React.useRef<HTMLInputElement | null>(null);

        const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
            if (!disabled) {
                const newValue = event.target.value;
                onChange(newValue);
            }
        }, [disabled, onChange]);

        const handleDivClick = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
            if (inputRef.current && !disabled) {
                inputRef.current.focus();
                setFocus(true);
            }

            onClick && onClick(e)
        }, []);

        const handleBlur = React.useCallback((event: React.FocusEvent<HTMLInputElement>) => {
            if (!disabled) {
                setFocus(false);
                onBlur && onBlur(event);
            }
        }, [onBlur, disabled]);

        const handleFocus = React.useCallback((event: React.FocusEvent<HTMLInputElement>) => {
            if (!disabled) {
                setFocus(true);
                onFocus && onFocus(event);
            }
        }, [onFocus, disabled]);

        const inputLabel = label && <label>{label}</label>;

        const inputIcon = React.useMemo(() => {
            if (!error && !icon) {
                return null;
            }
            const inputIcon = error ? <ErrorIcon outline={false} color={styling.cssColors.red} /> : icon;
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
        }, [errorMessage, error, isOptional, helperText]);

        const inputContentClasses = classNames(styles.inputContent, {
            [styles.focus]: focus,
            [styles.error]: error,
            [styles.disabled]: disabled,
            [styles.labelLess]: !label,
        });

        const inputTextContentClasses = classNames(styles.inputTextContent, {
            [styles.moveLabel]: value.length || focus,
            [styles.disabled]: disabled,
            [styles.error]: error,
        });

        const placeholderValue = React.useMemo(() => {
            return placeholder && (focus || !label) ? placeholder : '';
        }, [placeholder, focus, label]);

        return (
            <div className={styles.inputContainer}>
                <div
                    className={inputContentClasses}
                    onClick={handleDivClick}
                >
                    {asideComponent}
                    <div className={inputTextContentClasses}>
                        {inputLabel}
                        <input
                            ref={inputRef}
                            placeholder={placeholderValue}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            value={value}
                            onChange={handleChange}
                            disabled={disabled}
                            onKeyUp={onKeyUp}
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
