import * as React from "react";
import { ReactNode, useRef, useEffect, EffectCallback } from "react";
import * as ReactDOM from "react-dom";
import useOverlayContainer from "./useOverlayContainer";

export default (isVisible: Boolean, content: ReactNode): void => {
    const ref = useRef(document.createElement("div"));
    const overlayContainer = useOverlayContainer();

    useEffect((): EffectCallback => {
        if (!isVisible) {
            return;
        }

        ReactDOM.render(<React.Fragment>{content}</React.Fragment>, ref.current);
        overlayContainer.prepend(ref.current);

        return () => {
            overlayContainer.removeChild(ref.current);
        };
    }, [isVisible, content]);
};
