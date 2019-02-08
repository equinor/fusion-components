import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import ComponentDisplayContext, {
    componentDisplayTypes,
} from "../../contexts/ComponentDisplayContext";
import styles from "./styles.less";

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

        // Link
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
        mouseHasBeenDown: false,
    };

    onMouseUp() {
        this.setState({
            isMouseDown: false,
            mouseHasBeenDown: true,
        });

        if (this.button) {
            this.button.blur();
        }
    }

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

    getMouseDownClasses = () => {
        const { isMouseDown, mouseHasBeenDown } = this.state;

        return {
            [styles.mouseIsDown]: isMouseDown,
            [styles.mouseHasBeenDown]: mouseHasBeenDown,
        };
    };

    getButtonVariantClasses = () => {
        const { contained, outlined, frameless } = this.props;

        return {
            [styles.contained]: contained || (!outlined && !frameless), // Default to contained
            [styles.outlined]: outlined,
            [styles.frameless]: frameless,
            [styles.icon]: false,
        };
    };

    getButtonStyleClasses = () => {
        const { primary, signal } = this.props;
        return {
            [styles.primary]: primary,
            [styles.signal]: signal,
        };
    };

    getButtonSizeClasses = displayType => {
        const { small, medium, large } = this.props;

        return {
            [styles.small]:
                small || displayType === componentDisplayTypes.compact,
            [styles.medium]:
                (medium || (!small && !large)) &&
                displayType !== componentDisplayTypes.compact, // Default to medium
            [styles.large]:
                large && displayType !== componentDisplayTypes.compact,
        };
    };

    getButtonClasses = (displayType, props) =>
        classNames(
            props.className,
            styles.container,
            {
                [styles.block]: props.block,
                [styles.flex]: props.flex,
            },
            this.getMouseDownClasses(props),
            this.getButtonVariantClasses(props),
            this.getButtonStyleClasses(props),
            this.getButtonSizeClasses(displayType)
        );

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

        const containerClassNames = this.getButtonClasses(displayType, {
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
