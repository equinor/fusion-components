import * as React from 'react';
import useRelativePositioning from './useRelativePositioning';
import useOverlayPortal from './useOverlayPortal';

export default (content: React.ReactNode, ref: React.RefObject<any>, isVisible: boolean = true) => {
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
