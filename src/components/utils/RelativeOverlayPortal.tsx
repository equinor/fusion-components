import { FC, ReactNode, MutableRefObject } from 'react';
import { useOverlayContainer, useRelativePositioning } from '@equinor/fusion-components';
import { createPortal } from 'react-dom';

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
        >
            {children}
        </div>,
        overlayContainer
    );
};

export default RelativeOverlayPortal;
