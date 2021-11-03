import { useComponentDisplayType } from '@equinor/fusion';
import ButtonComponent from './components/Button';
import AnchorComponent from './components/Anchor';
import {
    useState,
    createRef,
    forwardRef,
    EventHandler,
    SyntheticEvent,
    PropsWithChildren,
    RefObject,
} from 'react';

export type ButtonProps = {
    disabled?: boolean;

    // Variants
    /** Use the contained variant */
    contained?: boolean;
    /** Use the outlined variant */
    outlined?: boolean;
    /** Use the frameless variant */
    frameless?: boolean;

    // Colors
    /** Use the primary variant */
    primary?: boolean;

    /** Use the danger variant */
    danger?: boolean;

    // Link
    /** Provide an url and the button wil use <a>-tag instead of <button>-tag */
    url?: string | null;
    /** Provide an url and the button wil use <Link>-tag instead of <button>-tag */
    relativeUrl?: string | null;

    /** Set target="_blank" */
    targetBlank?: boolean;
    onMouseDown?: EventHandler<SyntheticEvent>;
    onClickCapture?: EventHandler<SyntheticEvent>;
    onClick?: EventHandler<SyntheticEvent>;
    id?: string;
};

/**
 * @deprecated
 * @see Link : {@link https://equinor.github.io/fusion-react-components/?path=/docs/input-button--page}
 */

export const Button = forwardRef<HTMLElement | null, PropsWithChildren<ButtonProps>>(
    (props, ref) => {
        // Used to apply "radar" animation on mouse up
        const [mouseHasBeenDown, setMouseHasBeenDown] = useState(false);
        const displayType = useComponentDisplayType();

        const buttonRef = (ref as RefObject<HTMLElement | null>) || createRef<HTMLElement | null>();

        const handleOnMouseDown = (e: SyntheticEvent) => {
            const { onMouseDown } = props;

            setMouseHasBeenDown(false);

            if (onMouseDown) {
                onMouseDown(e);
            }
        };

        const handleOnMouseUp = () => {
            setMouseHasBeenDown(true);
            // Focus is automatically set to the button on click,
            // but we don't want it to have focus after the click
            // action is performed. Only when tabbing to the button
            if (buttonRef.current !== null) {
                buttonRef.current.blur();
            }
        };

        return props.url || props.relativeUrl ? (
            <AnchorComponent
                {...props}
                displayType={displayType}
                ref={buttonRef as RefObject<HTMLAnchorElement>}
                mouseHasBeenDown={mouseHasBeenDown}
                onMouseDown={handleOnMouseDown}
                onMouseUp={handleOnMouseUp}
                onClick={props.onClick}
                onClickCapture={props.onClickCapture}
                url={props.url}
                relativeUrl={props.relativeUrl}
            />
        ) : (
            <ButtonComponent
                {...props}
                displayType={displayType}
                ref={buttonRef as RefObject<HTMLButtonElement>}
                mouseHasBeenDown={mouseHasBeenDown}
                onMouseDown={handleOnMouseDown}
                onMouseUp={handleOnMouseUp}
                onClick={props.onClick}
                onClickCapture={props.onClickCapture}
                id={props.id}
            />
        );
    }
);

Button.displayName = 'Button';

Button.defaultProps = {
    disabled: false,
    contained: false,
    outlined: false,
    frameless: false,
    url: null,
    relativeUrl: null,
    targetBlank: false,
    onMouseDown: () => { },
    onClickCapture: () => { },
    onClick: () => { },
};

export default Button;
