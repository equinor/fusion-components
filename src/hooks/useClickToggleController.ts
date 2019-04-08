import { Dispatch, useState, useCallback } from "react";
import useClickOutsideOverlayPortal from "./useClickOutsideOverlayPortal";
import useEventListener from "./useEventListener";

export default (): [Boolean, Dispatch<HTMLElement>] => {
    const [isToggled, setIsToggled] = useState(false);
    const [ref, setRef] = useState<HTMLElement>(null);

    const toggle = () => setIsToggled(prevIsToggled => !prevIsToggled);
    const close = useCallback(() => isToggled && setIsToggled(false), [
        isToggled,
    ]);

    useClickOutsideOverlayPortal(close);

    useEventListener(ref, "click", toggle, [isToggled, ref]);

    return [isToggled, setRef];
};
