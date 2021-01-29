import * as React from 'react';

/**
 * Give you tools to handle fullscreen mode using buttons or other means than the usual F11 button.
 * Per default the hook will fullscreen the body tag, but this can be changed by passing in a ref to another element
 * @param elementRef a ref to specific element on page you want to set into fullscreen mode.
 */

const checkIsFullscreenActive = () =>
    Boolean(document?.fullscreenElement ?? (document as any)?.webkitFullscreenElement);

const exitFullscreen = (): void =>
    document?.exitFullscreen
        ? document?.exitFullscreen()
        : (document as any)?.webkitExitFullscreen();

const requestFullscreenForElement = (element: React.RefObject<HTMLElement>): void =>
    element.current.requestFullscreen
        ? element.current.requestFullscreen()
        : (element.current as any).webkitRequestFullscreen();

const useFullscreen = (elementRef?: React.RefObject<HTMLElement> | null) => {
    const [isFullscreenActive, setIsFullscreenActive] = React.useState(checkIsFullscreenActive());

    const element = elementRef ?? React.useRef(document.body);

    const requestFullscreen = React.useCallback(() => requestFullscreenForElement(element), [
        element,
    ]);

    const toggleFullscreen = React.useCallback(() => {
        isFullscreenActive ? exitFullscreen() : requestFullscreen();
    }, [isFullscreenActive, requestFullscreen, exitFullscreen]);

    const onFullscreenChange = React.useCallback(() => {
        setIsFullscreenActive(checkIsFullscreenActive());
    }, []);

    React.useEffect(() => {
        element.current.addEventListener('fullscreenchange', onFullscreenChange);
        element.current.addEventListener('webkitfullscreenchange', onFullscreenChange);
        return () => {
            element.current.removeEventListener('fullscreenchange', onFullscreenChange);
            element.current.removeEventListener('webkitfullscreenchange', onFullscreenChange);
        };
    }, []);

    return { toggleFullscreen, requestFullscreen, exitFullscreen, isFullscreenActive };
};

export default useFullscreen;
