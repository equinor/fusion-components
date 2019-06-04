import * as React from 'react';
import ComponentDisplayContext from '../../contexts/componentDisplayContext';
import ButtonComponent from './components/Button';
import AnchorComponent from './components/Anchor';

type ButtonProps = {
    disabled?: boolean;

    // Variants
    /** Use the contained variant */
    contained?: boolean;
    /** Use the outlined variant */
    outlined?: boolean;
    /** Use the frameless variant */
    frameless?: boolean;

    // Styles
    /** Use the primary coloring */
    primary?: boolean;
    /** Use the signal coloring */
    signal?: boolean;

    // Sizes
    /** Compact button */
    compact?: boolean;
    /** Comfortable button */
    comfortable?: boolean;

    // Link
    /** Provide an url and the button wil use <a>-tag instead of <button>-tag */
    url?: string | null;
    /** Set target="_blank" */
    targetBlank?: boolean;
    onMouseDown?: React.EventHandler<React.SyntheticEvent>;
    onClickCapture?: React.EventHandler<React.SyntheticEvent>;
    onClick?: React.EventHandler<React.SyntheticEvent>;
};

const Button = React.forwardRef<HTMLElement | null, React.PropsWithChildren<ButtonProps>>(
    (props, ref) => {
        // Used to apply "radar" animation on mouse up
        const [mouseHasBeenDown, setMouseHasBeenDown] = React.useState(false);
        const displayType = React.useContext<string>(ComponentDisplayContext);

        const buttonRef =
            (ref as React.RefObject<HTMLElement | null>) || React.createRef<HTMLElement | null>();

        const handleOnMouseDown = (e: React.SyntheticEvent) => {
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

        return props.url ? (
            <AnchorComponent
                {...props}
                displayType={displayType}
                ref={buttonRef as React.RefObject<HTMLAnchorElement | null>}
                mouseHasBeenDown={mouseHasBeenDown}
                onMouseDown={handleOnMouseDown}
                onMouseUp={handleOnMouseUp}
                onClick={props.onClick}
                onClickCapture={props.onClickCapture}
                url={props.url}
            />
        ) : (
            <ButtonComponent
                {...props}
                displayType={displayType}
                ref={buttonRef as React.RefObject<HTMLButtonElement | null>}
                mouseHasBeenDown={mouseHasBeenDown}
                onMouseDown={handleOnMouseDown}
                onMouseUp={handleOnMouseUp}
                onClick={props.onClick}
                onClickCapture={props.onClickCapture}
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
    primary: true,
    signal: false,
    compact: false,
    comfortable: true,
    url: null,
    targetBlank: false,
    onMouseDown: () => {},
    onClickCapture: () => {},
    onClick: () => {},
};

export default Button;
