import { useRelativePositioning, useOverlayPortal } from '@equinor/fusion-components';
import { ReactNode, RefObject } from 'react';

export default (content: ReactNode, ref: RefObject<any>, isVisible = true) => {
    const rect = useRelativePositioning(ref);

    useOverlayPortal(
        isVisible,
        <div
            style={{
                position: 'absolute',
                width: rect.width,
                height: rect.height,
                top: rect.top,
                left: rect.left,
            }}
        >
            {content}
        </div>
    );
};
