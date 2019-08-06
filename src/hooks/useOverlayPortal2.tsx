import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Router } from 'react-router-dom';
import { FusionContext, useFusionContext } from '@equinor/fusion';
import { useOverlayContainer } from '@equinor/fusion-components';

export default (isVisible: Boolean, content: ReactNode) => {
    const fusionContext = useFusionContext();
    const ref = document.createElement('div');
    const overlayContainer = useOverlayContainer();

    useEffect(() => {
        overlayContainer && overlayContainer.appendChild(ref);

        return () => {
            overlayContainer && overlayContainer.removeChild(ref);
        };
    }, [isVisible, content]);

    return createPortal(
        <Router history={fusionContext.history}>
            <FusionContext.Provider value={fusionContext}>{content}</FusionContext.Provider>
        </Router>,
        ref
    );
};
