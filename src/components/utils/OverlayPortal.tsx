import { useOverlayContainer } from "@equinor/fusion-components";
import { createPortal } from 'react-dom';
import { FC, ReactNode } from 'react';

type OverlayPortalProps = {
    children?: ReactNode;
    show?: boolean;
}

const OverlayPortal: FC<OverlayPortalProps> = ({ children, show }) => {
    const overlayContainer = useOverlayContainer();
    if (show == false || !overlayContainer) {
        return null;
    }
    return overlayContainer && createPortal(children, overlayContainer);
};
export default OverlayPortal;