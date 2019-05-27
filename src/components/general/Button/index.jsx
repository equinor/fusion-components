import React, { useState, useContext, createRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import ComponentDisplayContext from '../../contexts/ComponentDisplayContext';
import ButtonComponent from './components/Button';
import AnchorComponent from './components/Anchor';

const Button = forwardRef((props, ref) => {
    // Used to apply "radar" animation on mouse up
    const [mouseHasBeenDown, setMouseHasBeenDown] = useState(false);
    const displayType = useContext(ComponentDisplayContext);

    const buttonRef = ref || createRef();

    const handleOnMouseDown = e => {
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
        buttonRef.current.blur();
    };

    return props.url ? (
        <AnchorComponent
            {...props}
            displayType={displayType}
            ref={buttonRef}
            mouseHasBeenDown={mouseHasBeenDown}
            onMouseDown={handleOnMouseDown}
            onMouseUp={handleOnMouseUp}
        />
    ) : (
        <ButtonComponent
            {...props}
            displayType={displayType}
            ref={buttonRef}
            mouseHasBeenDown={mouseHasBeenDown}
            onMouseDown={handleOnMouseDown}
            onMouseUp={handleOnMouseUp}
        />
    );
});

Button.displayName = 'Button';

Button.propTypes = {
    children: PropTypes.node.isRequired,
    /** Disable the button */
    disabled: PropTypes.bool,

    // Variants
    /** Use the contained variant */
    contained: PropTypes.bool,
    /** Use the outlined variant */
    outlined: PropTypes.bool,
    /** Use the frameless variant */
    frameless: PropTypes.bool,

    // Styles
    /** Use the primary coloring */
    primary: PropTypes.bool,
    /** Use the signal coloring */
    signal: PropTypes.bool,

    // Sizes
    /** Compact button */
    compact: PropTypes.bool,
    /** Comfortable button */
    comfortable: PropTypes.bool,

    // Link
    /** Provide an url and the button wil use <a>-tag instead of <button>-tag */
    url: PropTypes.string,
    /** Set target="_blank" */
    targetBlank: PropTypes.bool,
    onMouseDown: PropTypes.func,
    onClickCapture: PropTypes.func,
    onClick: PropTypes.func,
};

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
