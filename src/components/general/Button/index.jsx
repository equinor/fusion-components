import React, { Component } from "react";
// import FontAwesome from "react-fontawesome";
import PropTypes from "prop-types";
import classNames from "classnames";
import ComponentDisplayContext, {
    componentDisplayTypes,
} from "../../contexts/ComponentDisplayContext";
import styles from "./styles.less";

// export const ButtonFontIcon = ({ name }) => {
//     return (
//         <span className={styles.icon}>
//             <FontAwesome name={name}/>
//         </span>
//     );
// };

const getMouseDownClasses = props => ({
    [styles.mouseIsDown]: props.isMouseDown,
    [styles.mouseHasBeenDown]: props.mouseHasBeenDown,
});

const getButtonVariantClasses = props => ({
    [styles.contained]:
        props.contained || (!props.outlined && !props.frameless), // Default to contained
    [styles.outlined]: props.outlined,
    [styles.frameless]: props.frameless,
    [styles.icon]:
        Array.isArray(props.children) &&
        props.children.find(
            c => typeof c !== "undefined" && c.type === ButtonFontIcon
        ),
});

const getButtonStyleClasses = props => ({
    [styles.primary]: props.primary,
    [styles.signal]: props.signal,
});

const getButtonSizeClasses = (displayType, props) => ({
    [styles.small]:
        props.small || displayType === componentDisplayTypes.compact,
    [styles.medium]:
        (props.medium || (!props.small && !props.large)) &&
        displayType !== componentDisplayTypes.compact, // Default to medium
    [styles.large]:
        props.large && displayType !== componentDisplayTypes.compact,
});

const getButtonClasses = (displayType, props) =>
    classNames(
        props.className,
        styles.container,
        {
            [styles.block]: props.block,
            [styles.flex]: props.flex,
        },
        getMouseDownClasses(props),
        getButtonVariantClasses(props),
        getButtonStyleClasses(props),
        getButtonSizeClasses(displayType, props)
    );

class Button extends Component {
    static propTypes = {
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
        /** Small button */
        small: PropTypes.bool,
        /** Medium button */
        medium: PropTypes.bool,
        /** Large button */
        large: PropTypes.bool,

        //Link
        /** Provide an url and the button wil use <a>-tag instead of <button>-tag */
        url: PropTypes.string,
        /** Set target="_blank" */
        targetBlank: PropTypes.bool,
        onMouseDown: PropTypes.func,
        onClickCapture: PropTypes.func,
        onClick: PropTypes.func,
    };

    static defaultProps = {
        disabled: false,
        contained: false,
        outlined: false,
        frameless: false,
        primary: true,
        signal: false,
        small: true,
        medium: true,
        large: false,
        url: null,
        targetBlank: false,
        onMouseDown: () => {},
        onClickCapture: () => {},
        onClick: () => {},
    };

    state = {
        isMouseDown: false,
    };

    onMouseDown(e) {
        const { onMouseDown } = this.props;
        if (onMouseDown) {
            onMouseDown(e);
        }

        this.setState({
            isMouseDown: true,
            mouseHasBeenDown: false,
        });
    }

    onMouseUp() {
        this.setState({
            isMouseDown: false,
            mouseHasBeenDown: true,
        });

        if (this.button) {
            this.button.blur();
        }
    }

    renderButtonContent() {
        const { children } = this.props;
        return <span className={styles.button}>{children}</span>;
    }

    renderButton(displayType) {
        const {
            disabled,
            onClick,
            onClickCapture,
            url,
            targetBlank,
        } = this.props;

        const containerClassNames = getButtonClasses(displayType, {
            ...this.props,
            ...this.state,
        });

        if (url) {
            return (
                <a
                    className={containerClassNames}
                    disabled={disabled}
                    href={url}
                    target={targetBlank ? "_blank" : "_self"}
                    onMouseDown={() => this.onMouseDown()}
                    onMouseUp={() => this.onMouseUp()}
                    onClickCapture={onClickCapture}
                    ref={button => {
                        this.button = button;
                    }}
                >
                    {this.renderButtonContent()}
                </a>
            );
        }
        return (
            <button
                type="button"
                className={containerClassNames}
                disabled={disabled}
                onClick={onClick}
                onMouseDown={e => this.onMouseDown(e)}
                onMouseUp={() => this.onMouseUp()}
                onClickCapture={onClickCapture}
                ref={button => {
                    this.button = button;
                }}
            >
                {this.renderButtonContent()}
            </button>
        );
    }

    render() {
        return (
            <ComponentDisplayContext.Consumer>
                {displayType => this.renderButton(displayType)}
            </ComponentDisplayContext.Consumer>
        );
    }
}

export default Button;
