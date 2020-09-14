import React, { ReactNode, useRef, useEffect } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Router } from 'react-router-dom';
import { FusionContext, useFusionContext } from '@equinor/fusion';
import useOverlayContainer from './useOverlayContainer';

export default (isVisible: Boolean, content: ReactNode): void => {
    const fusionContext = useFusionContext();
    const ref = useRef(document.createElement('div'));
    const overlayContainer = useOverlayContainer();
    const timer = useRef(0);

    useEffect(() => {
        if (!isVisible || !overlayContainer) {
            return;
        }

        clearTimeout(timer.current);
        overlayContainer.appendChild(ref.current);
        render(
            <Router history={fusionContext.history}>
                <FusionContext.Provider value={fusionContext}>{content}</FusionContext.Provider>
            </Router>,
            ref.current
        );

        return () => {
            timer.current = setTimeout(() => {
                unmountComponentAtNode(ref.current);
            });
        };
    }, [isVisible, content]);
};
