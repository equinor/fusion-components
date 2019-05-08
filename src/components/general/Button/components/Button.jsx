import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import Content from "./Content";
import getButtonClasses from "../buttonClasses";

const ButtonComponent = forwardRef(
    ({ children, disabled, onMouseDown, onMouseUp, onClick, onClickCapture, ...props }, ref) => (
        <button
            type="button"
            className={getButtonClasses(props)}
            disabled={disabled}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onClick={onClick}
            onClickCapture={onClickCapture}
            ref={ref}
        >
            <Content>{children}</Content>
        </button>
    )
);

ButtonComponent.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    onClickCapture: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
};

ButtonComponent.defaultProps = {
    disabled: true,
    onClick: null,
    onClickCapture: null,
    onMouseDown: null,
    onMouseUp: null,
};

ButtonComponent.displayName = "@fusion/components/general/Button/ButtonComponent";

export default ButtonComponent;
