import * as React from 'react';
import styles from './styles.less';
import classNames from 'classnames';

type TextInputProps = {
    disabled?: boolean;
    error?: boolean;
    helperText?: string;
    isRequired?: boolean;
    placeholder?: string;
    label?: string;
    onChange: (newValue: string) => void;
    value?: string;
    icon?: any;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const TextInput: React.FC<TextInputProps> = ({
    disabled = false,
    error,
    helperText,
    isRequired = false,
    placeholder = '',
    label,
    onChange,
    value = '',
    icon,
    onBlur,
    ...rest
}) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [focus, setFocus] = React.useState(false);

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

    const inputContentClasses = classNames(styles.inputContent, {
        [styles.focus]: focus,
        [styles.error]: error,
    });

    return (
        <div className={styles.inputContainer} >
            
            <div className={inputContentClasses} onClick={setInputFocus}>
                <div className={styles.inputTextContent}>
                    <span className={styles.label}>{label}</span>
                    <input
                    ref={inputRef}
                    placeholder={placeholder}
                    onBlur={handleBlur}
                    value={value}
                    onChange={handleChange}
                    {...rest}
                />
                </div>
                <div className={styles.icon}>{icon}</div>
            </div>
            <div className={styles.helperText}>{helperText}</div>
        </div>
    );
};

TextInput.displayName = 'TextInput';

export default TextInput;
