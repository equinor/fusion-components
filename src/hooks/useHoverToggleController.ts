import { useRef, useState, MutableRefObject, useCallback } from 'react';
import { useEventListener } from '@equinor/fusion-components';
import { Recoverable } from 'repl';

let showTimeout: NodeJS.Timeout;
export default (delay: number = 300): [Boolean, MutableRefObject<any>] => {
    const [isHovering, setIsHovering] = useState<Boolean>(false);
    const ref = useRef<HTMLElement | null>(null);

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
        [show, ref.current]
    );

    useEventListener(ref.current, 'mouseenter', show, [ref.current]);
    useEventListener(ref.current, 'mouseleave', hide, [ref.current]);
    useEventListener(window, 'mousemove', checkShouldShow, []);

    return [isHovering, ref];
};
