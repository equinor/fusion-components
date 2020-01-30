import { useRef, useState, MutableRefObject, useCallback, useEffect } from 'react';
import { useEventListener } from '@equinor/fusion-components';

let showTimeout: NodeJS.Timeout;
export default <T extends HTMLElement>(
    delay: number = 300
): [boolean, MutableRefObject<T | null>] => {
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

    return [isHovering, ref];
};
