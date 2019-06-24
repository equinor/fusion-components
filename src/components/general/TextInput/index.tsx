import * as React from 'react';
import styles from './styles.less';
import classNames from 'classnames';

type TextInputProps = {
    disabled?: boolean;
    error?: boolean;
    errorMessage?: string;
    isRequired?: boolean;
    placeholder?: string;
    label?: string;
    onChange: (newValue: string) => void;
    value?: string;
    icon?: any;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const TextInput = React.forwardRef<HTMLDivElement | null, React.PropsWithChildren<TextInputProps>>(
    (
        {
            disabled = false,
            error,
            errorMessage,
            isRequired = false,
            placeholder = '',
            label,
            onChange,
            value = '',
            icon,
            onBlur,
            ...props
        },
        ref
    ) => {
        const inputRef = React.useRef<HTMLInputElement>(null);
        const [focus, setFocus] = React.useState(false);
        const inputContainerRef = ref as React.RefObject<HTMLDivElement | null>;

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

        const inputLabel = label && (
            <span className={styles.label}>
                {label}
                {isRequired && '*'}
            </span>
        );

        const inputIcon = icon && <div className={styles.icon}>{icon}</div>;

        const inputHelperText = React.useMemo(() => {
            if (errorMessage && error) {
                return (
                    <div className={classNames(styles.helperText, styles.error)}>
                        {errorMessage}
                    </div>
                );
            }
            if (isRequired) {
                return <div className={styles.helperText}>*Required</div>;
            }
            return null;
        }, [errorMessage, error, isRequired]);

        const inputContentClasses = classNames(styles.inputContent, {
            [styles.focus]: focus,
            [styles.error]: error,
            [styles.disabled]: disabled,
        });

        const inputTextContentClasses = classNames(styles.inputTextContent, {
            [styles.labelLess]: !label,
        });

        return (
            <div className={styles.inputContainer} ref={inputContainerRef}>
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
