import * as React from 'react';
import styles from "./styles.less";
import classNames from "classnames";

type TextInputProps = {
    disabled?: boolean,
    errorMessage?: string,
    error?: boolean,
    helperText?: string,
    isOptional?: boolean,
    placeholder?: string,
    label?: string,
    onChange: (newValue: string) => void,
    value?: string,
}

const TextInput: React.FC<TextInputProps> = ({
    disabled = false,
    errorMessage,
    error,
    helperText,
    isOptional = false,
    placeholder = "",
    label,
    onChange,
    value = "",
}) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [focus, setFocus] = React.useState(false);

    const handleChange = (event) => {
        if (!disabled) {
            const newValue = event.target.value;
            onChange(newValue);
        }
    };

    const setInputFocus = () => {
        if(inputRef.current){
            inputRef.current.focus();
            setFocus(true);
        }
    }

    const inputContainerClasses = classNames(styles.inputContainer, {
        [styles.focus]: focus,
        [styles.error]: error
    })
    
    return <div className={inputContainerClasses} onClick={setInputFocus}>
        <span className={styles.label}>{label}</span>
        <div className={styles.inputContent}>
            <input ref={inputRef} placeholder={placeholder} onBlur={() => setFocus(false)}/>
            <div className={styles.icon}>
                
            </div>
        </div>
    </div>
};

export default TextInput;
