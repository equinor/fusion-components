import { useRef, useState, MutableRefObject, useCallback, useEffect } from 'react';
import { useEventListener } from '@equinor/fusion-components';
import { Dispatch, SetStateAction } from 'react';

let showTimeout: NodeJS.Timeout;
export default <T extends HTMLElement>(delay = 300): [boolean, MutableRefObject<T | null>, Dispatch<SetStateAction<boolean>>] => {
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const ref = useRef<T | null>(null);

    const show = useCallback(() => {
        clearTimeout(showTimeout);
        showTimeout = setTimeout(() => setIsHovering(true), delay);
    }, [delay]);

    const hide = useCallback(() => {
        clearTimeout(showTimeout);
        setIsHovering(false);
    }, []);

    const checkShouldShow = useCallback(
        (e: Event) => {
            if (!ref.current || !e.target) {
                if (isHovering) {
                    hide();
                }

                return;
            }
        },
        [hide, ref.current, isHovering]
    );

    useEventListener(ref.current, 'mouseenter', show, [ref.current]);
    useEventListener(ref.current, 'mouseleave', hide, [ref.current]);
    useEventListener(window, 'mousemove', checkShouldShow, [checkShouldShow]);

    return [isHovering, ref, setIsHovering];
};
