import * as React from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import { ErrorIcon, styling } from '@equinor/fusion-components';
import TextareaAutosize from 'react-textarea-autosize';

type TextAreaProps = {
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
    onIconAction?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};
const TextArea = React.forwardRef<
    HTMLTextAreaElement | null,
    React.PropsWithChildren<TextAreaProps>
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
            icon,
            onChange,
            onClick,
            value = '',
            onBlur,
            onIconAction,
            helperText = '',
            ...props
        },
        ref
    ) => {
        const [focus, setFocus] = React.useState(false);
        const inputRef =
            (ref as React.MutableRefObject<HTMLTextAreaElement | null>) ||
            React.useRef<HTMLTextAreaElement | null>(null);

        const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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

        const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
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
                <ErrorIcon outline={false} color={styling.cssColors.red} />
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
        }, [errorMessage, error, isOptional, helperText]);

        const inputContentClasses = classNames(styles.textAreaContent, {
            [styles.focus]: focus,
            [styles.error]: error,
            [styles.disabled]: disabled,
            [styles.labelLess]: !label,
        });

        const inputTextContentClasses = classNames(styles.inputTextContent, {
            [styles.moveLabel]: (value.length && !disabled) || (focus && !disabled),
            [styles.disabled]: disabled,
            [styles.error]: error,
        });

        const placeholderValue = React.useMemo(() => {
            return placeholder && (focus || !label) ? placeholder : '';
        }, [placeholder, focus, label]);

        return (
            <>
                <div className={styles.textAreaContainer}>
                    <div
                        className={inputContentClasses}
                        onClick={e => {
                            setInputFocus();
                            onClick && onClick(e);
                        }}
                    >
                        {asideComponent}
                        <div className={inputTextContentClasses}>
                            {inputLabel}
                            <TextareaAutosize
                                ref={inputRef}
                                placeholder={placeholderValue}
                                onBlur={handleBlur}
                                value={!disabled ? value : ''}
                                onChange={handleChange}
                                disabled={disabled}
                                {...props}
                            />
                        </div>
                    </div>
                    <div className={styles.helperIconText}>
                        {inputIcon}
                        {inputHelperText}
                    </div>
                </div>
            </>
        );
    }
);

TextArea.displayName = 'TextArea';

export default TextArea;
