import { useState, useEffect, MutableRefObject } from 'react';
import useEventListener from './useEventListener';

const defaultRect: ClientRect = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: 0,
    height: 0,
};

export default (ref: MutableRefObject<HTMLElement | null>) => {
    const [rect, setRect] = useState(defaultRect);

    const setRectFromRef = () => {
        if (ref.current === null) {
            return;
        }

        const newRect = ref.current.getBoundingClientRect();

        setRect(newRect);
    };

    useEffect(setRectFromRef, [ref.current]);

    useEventListener(window, 'resize', setRectFromRef, [ref.current]);
    useEventListener(document.body, 'scroll', setRectFromRef, [ref.current]);

    return rect;
};
