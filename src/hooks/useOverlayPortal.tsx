import { ReactNode, useRef, useEffect } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Router } from 'react-router-dom';
import { FusionContext, useFusionContext } from '@equinor/fusion';
import { useOverlayContainer } from '@equinor/fusion-components';

export default (isVisible: boolean, content: ReactNode): void => {
    const fusionContext = useFusionContext();
    const ref = useRef(document.createElement('div'));
    const overlayContainer = useOverlayContainer();
    const timer = useRef<NodeJS.Timeout>(null);

    useEffect(() => {
        if (!isVisible || !overlayContainer) {
            return;
        }

        clearTimeout(timer.current);

        overlayContainer.appendChild(ref.current);
        render(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore @odinr - temp fix for react router 5 apps
            <Router history={fusionContext.history} location={fusionContext.history.location}>
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
