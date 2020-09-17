import * as React from 'react';
import { useHangingGardenContext } from '../hooks/useHangingGardenContext';
import useGarden from './useGarden';

const useRendererSize = () => {
    const { pixiApp, container, columns } = useHangingGardenContext();
    const { renderGarden } = useGarden();

    const checkRendererSizeAnimationframe = React.useRef(0);

    React.useEffect(() => {
        checkRendererSize();

        return () => {
            window.cancelAnimationFrame(checkRendererSizeAnimationframe.current);
        };
    }, [columns]);

    const checkRendererSize = React.useCallback(() => {
        if (!container.current || !pixiApp) {
            checkRendererSizeAnimationframe.current = window.requestAnimationFrame(
                checkRendererSize
            );
            return;
        }

        const { offsetWidth, offsetHeight } = container.current;
        const { width, height } = pixiApp.renderer;

        if (width !== offsetWidth || height !== offsetHeight) {
            pixiApp.renderer.resize(offsetWidth, offsetHeight);
            renderGarden();
        }

        checkRendererSizeAnimationframe.current = window.requestAnimationFrame(checkRendererSize);
    }, [
        container.current?.offsetWidth,
        container.current?.offsetHeight,
        pixiApp,
        checkRendererSizeAnimationframe.current,
        renderGarden,
    ]);

    return { checkRendererSize, checkRendererSizeAnimationframe };
};

export default useRendererSize;
