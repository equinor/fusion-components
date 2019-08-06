import React, { FC, ReactNode, MutableRefObject, useEffect } from 'react';
import { useOverlayContainer, useRelativePositioning } from '@equinor/fusion-components';
import { createPortal } from 'react-dom';

type OverlayProps = {
    children?: ReactNode;
    relativeRef: MutableRefObject<HTMLElement | null>;
    show?: boolean;
};

const RelativeOverlayPortal: FC<OverlayProps> = ({ children, relativeRef, show }) => {
    const element = document.createElement('div');
    const overlayContainer = useOverlayContainer();
    const rect = useRelativePositioning(relativeRef);

    useEffect(() => {
        overlayContainer && overlayContainer.appendChild(element);

        return () => {
            overlayContainer && overlayContainer.removeChild(element);
        };
    }, []);

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
