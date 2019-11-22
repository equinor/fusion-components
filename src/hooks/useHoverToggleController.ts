import { useRef, useState, MutableRefObject, useCallback } from 'react';
import { useEventListener } from '@equinor/fusion-components';
import { Recoverable } from 'repl';

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

    const hide = () => {
        clearTimeout(showTimeout);
        setIsHovering(false);
    };

    const checkShouldShow = useCallback(
        (e: Event) => {
            if (!ref.current || !e.target) {
                return;
            }

            const target = e.target as Node;
            const isWithinRef = ref.current.isSameNode(target);

            if (isWithinRef && !isHovering) {
                show();
            } else if (!isWithinRef && isHovering) {
                hide();
            }
        },
        [show, ref.current, isHovering]
    );

    useEventListener(ref.current, 'mouseenter', show, [ref.current]);
    useEventListener(ref.current, 'mouseleave', hide, [ref.current]);
    useEventListener(window, 'mousemove', checkShouldShow, []);

    return [isHovering, ref];
};
