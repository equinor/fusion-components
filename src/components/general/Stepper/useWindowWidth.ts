import { useEffect, useState } from 'react';
import { useFusionContext } from '@equinor/fusion';

export default () => {
    const fusionContext = useFusionContext();
    const rootElement = fusionContext.refs.root;
    const [windowWidth, setWindowWidth] = useState<number>(0);

    useEffect(() => {
        let animationFrame = 0;

        const checkWidth = () => {
            if (rootElement && rootElement.current) {
                const width = rootElement.current.clientWidth;

                if (width != windowWidth) {
                    setWindowWidth(width);
                }
            }
            animationFrame = window.requestAnimationFrame(checkWidth);
        };
        checkWidth();
        return () => window.cancelAnimationFrame(animationFrame);
    }, [rootElement, windowWidth]);

    return windowWidth;
};
