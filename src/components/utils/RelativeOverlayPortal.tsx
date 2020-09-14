import React, { FC, ReactNode, MutableRefObject } from 'react';
import { createPortal } from 'react-dom';
import useOverlayContainer from 'hooks/useOverlayContainer';
import useRelativePositioning from 'hooks/useRelativePositioning';

type OverlayProps = {
    children?: ReactNode;
    relativeRef: MutableRefObject<HTMLElement | null>;
    show?: boolean;
};

const RelativeOverlayPortal: FC<OverlayProps> = ({ children, relativeRef, show }) => {
    const overlayContainer = useOverlayContainer();
    const rect = useRelativePositioning(relativeRef);

    if (!overlayContainer || show === false) {
        return null;
    }

    return createPortal(
        <div
            style={{
                position: 'absolute',
                width: rect.width,
                height: rect.height,
                top: rect.top,
                left: rect.left,
            }}
        >{children}</div>,
        overlayContainer
    );
};

export default RelativeOverlayPortal;
