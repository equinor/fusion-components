import * as React from 'react';
import { useRelativePositioning, useOverlayPortal } from 'index';

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
