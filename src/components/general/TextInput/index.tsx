import * as React from 'react';

type TextInputProps = {
    disabled?: boolean,
    errorMessage?: string,
    helperText?: string,
    isOptional?: boolean,
    placeholder?: boolean,
    label?: string,
    onChange: (newValue: string) => void,
    value?: string,
}

const TextInput: React.FC<TextInputProps> = ({
    disabled = false,
    errorMessage,
    helperText,
    isOptional = false,
    placeholder = "",
    label,
    onChange,
    value = "",
}) => {

    const handleChange = (event) => {
        if (!disabled) {
            const newValue = event.target.value;
            onChange(newValue);
        }
    };

    
    return <div>TextInput</div>;
};

export default TextInput;
