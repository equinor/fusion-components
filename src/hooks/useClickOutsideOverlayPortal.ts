import useOverlayContainer from "./useOverlayContainer";
import useEventListener from "./useEventListener";

export default (callback : EventListener, target?: HTMLElement | null) : void => {
    const overlayContainer = useOverlayContainer();

    const handleClick : EventListener = e => {
        const clickedOutsideTarget = target && target !== e.target && !target.contains(e.target as Node);
        const clickedOnOrOutsideOverlay = overlayContainer === e.target || !overlayContainer.contains(e.target as Node);

        if(clickedOutsideTarget || clickedOnOrOutsideOverlay) {
            callback(e);
        }
    };

    useEventListener(document.body, "click", handleClick, [callback, target]);
};