import { useRelativePositioning, useOverlayPortal } from '@equinor/fusion-components';

export default (content: React.ReactNode, ref: React.RefObject<any>, isVisible = true) => {
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
