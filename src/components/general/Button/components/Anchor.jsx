import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import Content from "./Content";
import getButtonClasses from "../buttonClasses";

const AnchorComponent = forwardRef(
    (
        {
            children,
            disabled,
            url,
            targetBlank,
            onMouseDown,
            onMouseUp,
            onClick,
            onClickCapture,
            ...props
        },
        ref
    ) => (
        <a
            className={getButtonClasses(props)}
            disabled={disabled}
            href={url}
            target={targetBlank ? "_blank" : "_self"}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onClick={onClick}
            onClickCapture={onClickCapture}
            ref={ref}
        >
            <Content>{children}</Content>
        </a>
    )
);

AnchorComponent.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    disabled: PropTypes.bool,
    url: PropTypes.string.isRequired,
    targetBlank: PropTypes.bool,
    onClick: PropTypes.func,
    onClickCapture: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
};

AnchorComponent.defaultProps = {
    disabled: true,
    targetBlank: false,
    onClick: null,
    onClickCapture: null,
    onMouseDown: null,
    onMouseUp: null,
};

AnchorComponent.displayName = "@fusion/components/general/Button/AnchorComponent";

export default AnchorComponent;
