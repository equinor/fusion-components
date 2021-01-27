import * as React from 'react';

/**
 * Give you tools to handle fullscreen mode using buttons or other means than the usual F11 button.
 * Per default the hook will fullscreen the body tag, but this can be changed by passing in a ref to another element
 * @param elementRef a ref to specific element on page you want to set into fullscreen mode.
 */

const useFullscreen = (elementRef?: React.RefObject<HTMLElement> | null) => {
    const [isFullscreenActive, setIsFullscreenActive] = React.useState(
        Boolean(document?.fullscreenElement ?? (document as any)?.webkitFullscreenElement)
    );

    const checkIsFullscreenActive = React.useCallback(
        () =>
            setIsFullscreenActive(
                Boolean(document?.fullscreenElement ?? (document as any)?.webkitFullscreenElement)
            ),
        [document]
    );

    const element = elementRef ?? React.useRef(document.body);

    const requestFullscreen = React.useCallback(
        () =>
            element.current.requestFullscreen
                ? element.current.requestFullscreen()
                : (element.current as any).webkitRequestFullscreen(),
        [element]
    );

    const exitFullscreen = React.useCallback(
        () =>
            document?.exitFullscreen
                ? document?.exitFullscreen()
                : (document as any)?.webkitExitFullscreen(),
        [document]
    );

    const toggleFullscreen = React.useCallback(() => {
        isFullscreenActive ? exitFullscreen() : requestFullscreen();
    }, [isFullscreenActive, requestFullscreen, exitFullscreen]);

    React.useEffect(() => {
        element.current.addEventListener('fullscreenchange', checkIsFullscreenActive);
        element.current.addEventListener('webkitfullscreenchange', checkIsFullscreenActive);
        return () => {
            element.current.removeEventListener('fullscreenchange', checkIsFullscreenActive);
            element.current.removeEventListener('webkitfullscreenchange', checkIsFullscreenActive);
        };
    }, []);

    return { toggleFullscreen, requestFullscreen, exitFullscreen, isFullscreenActive };
};

export default useFullscreen;
