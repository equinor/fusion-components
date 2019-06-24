import * as React from 'react';
import { ReactNode, useRef, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import { FusionContext, useFusionContext } from '@equinor/fusion';
import useOverlayContainer from './useOverlayContainer';

export default (isVisible: Boolean, content: ReactNode): void => {
    const fusionContext = useFusionContext();
    const ref = useRef(document.createElement('div'));
    const overlayContainer = useOverlayContainer();

    useEffect(() => {
        if (!isVisible || !overlayContainer) {
            return;
        }

        ReactDOM.render(
            <FusionContext.Provider value={fusionContext}>{content}</FusionContext.Provider>,
            ref.current
        );
        overlayContainer.prepend(ref.current);

        return () => {
            overlayContainer.removeChild(ref.current);
        };
    }, [isVisible, content]);
};
