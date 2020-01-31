import { useRef, useState, MutableRefObject, useCallback } from 'react';
import { useEventListener } from '@equinor/fusion-components';
export default <T extends HTMLElement>(
    delay: number = 300
): [boolean, MutableRefObject<T | null>] => {
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const ref = useRef<T | null>(null);
    const timer = useRef<NodeJS.Timeout>();

    const show = useCallback(() => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setIsHovering(true), delay);
    }, [delay, timer.current]);

    const hide = useCallback(() => {
        if (timer.current) clearTimeout(timer.current);
        if (isHovering) {
            setIsHovering(false);
        }
    }, [isHovering, timer.current]);

    const checkShouldShow = useCallback(
        (e: Event) => {
            if (!ref.current) {
                hide();
                return;
            }
            const mouseEvent = e as MouseEvent;
            const hoveredElement = document.elementFromPoint(mouseEvent.pageX, mouseEvent.pageY);
            const isWithinRef =
                ref.current == hoveredElement || ref.current.contains(hoveredElement);
            if (isWithinRef && !isHovering) {
                show();
            } else if (!isWithinRef) {
                hide();
            }
        },
        [show, hide, ref.current, isHovering]
    );

    useEventListener(window, 'mousemove', checkShouldShow, [checkShouldShow]);

    return [isHovering, ref];
};
