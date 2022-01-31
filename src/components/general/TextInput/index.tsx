import { useStyles } from './TextInput.style';
import classNames from 'classnames';
import { ErrorIcon, styling } from '@equinor/fusion-components';
import {
    useState,
    useRef,
    useCallback,
    useMemo,
    forwardRef,
    FocusEvent,
    KeyboardEvent,
    PropsWithChildren,
    MutableRefObject,
    ChangeEvent,
    ReactElement,
    MouseEvent,
    MouseEventHandler,
} from 'react';

type TextInputProps = {
    id?: string;
    disabled?: boolean;
    error?: boolean;
    errorMessage?: string;
    isOptional?: boolean;
    placeholder?: string;
    label?: string;
    asideComponent?: any;
    helperText?: string;
    onChange: (newValue: string) => void;
    onClick?: MouseEventHandler<HTMLDivElement>;
    value?: string;
    icon?: ReactElement;
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
    onIconAction?: MouseEventHandler<HTMLDivElement>; // (event: MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
};

const TextInput = forwardRef<HTMLInputElement | null, PropsWithChildren<TextInputProps>>(
    (
        {
            id = '',
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
        const styles = useStyles();
        const [focus, setFocus] = useState(false);
        const inputRef =
            (ref as MutableRefObject<HTMLInputElement | null>) ||
            useRef<HTMLInputElement | null>(null);

        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                if (!disabled) {
                    const newValue = event.target.value;
                    onChange(newValue);
                }
            },
            [disabled, onChange]
        );

        const handleDivClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
            if (inputRef.current && !disabled) {
                inputRef.current.focus();
                setFocus(true);
            }

            onClick && onClick(e);
        }, []);

        const handleBlur = useCallback(
            (event: FocusEvent<HTMLInputElement>) => {
                if (!disabled) {
                    setFocus(false);
                    onBlur && onBlur(event);
                }
            },
            [onBlur, disabled]
        );

        const handleFocus = useCallback(
            (event: FocusEvent<HTMLInputElement>) => {
                if (!disabled) {
                    setFocus(true);
                    onFocus && onFocus(event);
                }
            },
            [onFocus, disabled]
        );

        const inputLabel = label && <label>{label}</label>;

        const inputIcon = useMemo(() => {
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

        const inputHelperText = useMemo(() => {
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

        const placeholderValue = useMemo(() => {
            return placeholder && (focus || !label) ? placeholder : '';
        }, [placeholder, focus, label]);

        return (
            <div id={id} className={styles.inputContainer}>
                <div className={inputContentClasses} onClick={handleDivClick}>
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
