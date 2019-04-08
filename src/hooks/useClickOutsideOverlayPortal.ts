import useOverlayContainer from "./useOverlayContainer";
import useEventListener from "./useEventListener";

export default (callback : EventListener) : void => {
    const overlayContainer = useOverlayContainer();

    const handleClick : EventListener = e => {
        if(!overlayContainer.contains(e.target as Node)) {
            callback(e);
        }
    };

    useEventListener(overlayContainer, "click", handleClick, [callback]);
};