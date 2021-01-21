import * as React from 'react';

/**
 * Give you tools to handle fullscreen mode using buttons or other means than the usual F11 button.
 * Per default the hook will set entire Fusion into fullscreen, but this can be changed by passing in a ref to another element
 * @param elementRef a ref to specific element on page you want to set into fullscreen mode.
 */

const useFullscreen = (elementRef?: React.RefObject<HTMLElement> | null) => {
    const [isFullscreenActive, setIsFullscreenActive] = React.useState(
        Boolean(document.fullscreenElement)
    );

    const element = elementRef ?? React.useRef(document.getElementById('app'));

    const checkIsFullscreenActive = React.useCallback(() => {
        setIsFullscreenActive(Boolean(document.fullscreenElement));
    }, [document]);

    const requestFullscreen = React.useCallback(() => element.current?.requestFullscreen(), [
        element,
    ]);

    const exitFullscreen = React.useCallback(() => document.exitFullscreen(), [document]);

    const toggleFullscreen = React.useCallback(() => {
        isFullscreenActive ? exitFullscreen() : requestFullscreen();
    }, [isFullscreenActive, requestFullscreen, exitFullscreen]);

    React.useEffect(() => {
        element.current?.addEventListener('fullscreenchange', checkIsFullscreenActive);
        return () =>
            element.current?.removeEventListener('fullscreenchange', checkIsFullscreenActive);
    }, []);

    return { toggleFullscreen, requestFullscreen, exitFullscreen, isFullscreenActive };
};

export default useFullscreen;
