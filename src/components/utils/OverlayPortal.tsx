import { createPortal } from 'react-dom';
import { FC, ReactNode } from 'react';
import useOverlayContainer from 'hooks/useOverlayContainer';

type OverlayPortalProps = {
    children?: ReactNode;
    show?: boolean;
}

const OverlayPortal: FC<OverlayPortalProps> = ({ children, show }) => {
    const overlayContainer = useOverlayContainer();
    if (show == false || !overlayContainer) {
        return null;
    }
    return createPortal(children, overlayContainer);
};
export default OverlayPortal;