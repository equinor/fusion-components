import { MutableRefObject, useState, useRef, useCallback, useEffect, SetStateAction } from 'react';
import useClickOutsideOverlayPortal from './useClickOutsideOverlayPortal';
import useEventListener from './useEventListener';

export default <T extends HTMLElement>(): [
    Boolean,
    MutableRefObject<T | null>,
    React.Dispatch<SetStateAction<boolean>>
] => {
    const [isToggled, setIsToggled] = useState(false);
    const [internalRef, setInternalRef] = useState<HTMLElement | null>(null);

    const toggle = () => setIsToggled(prevIsToggled => !prevIsToggled);
    const close = useCallback(() => isToggled && setIsToggled(false), [isToggled]);

    useClickOutsideOverlayPortal(close);

    useEventListener(internalRef, 'click', toggle, [isToggled, internalRef]);

    // TODO : Find a better solition for this
    const ref = useRef<T>(null);
    useEffect(() => {
        if (ref.current !== internalRef) {
            setInternalRef(ref.current);
        }
    });

    return [isToggled, ref, setIsToggled];
};
