import React, { forwardRef } from "react";
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

AnchorComponent.displayName =
    "@fusion/components/general/Button/AnchorComponent";

export default AnchorComponent;
