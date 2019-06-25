import { useRef, useState, MutableRefObject, useCallback } from 'react';
import { useEventListener } from 'index';

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

    useEventListener(ref.current, 'mouseenter', show, [ref.current]);
    useEventListener(ref.current, 'mouseleave', hide, [ref.current]);

    return [isHovering, ref];
};
