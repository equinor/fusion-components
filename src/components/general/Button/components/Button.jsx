import React, { forwardRef } from "react";
import Content from "./Content";
import getButtonClasses from "../buttonClasses";

const ButtonComponent = forwardRef(
    (
        {
            children,
            disabled,
            onMouseDown,
            onMouseUp,
            onClick,
            onClickCapture,
            ...props
        },
        ref
    ) => (
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

ButtonComponent.displayName =
    "@fusion/components/general/Button/ButtonComponent";

export default ButtonComponent;
