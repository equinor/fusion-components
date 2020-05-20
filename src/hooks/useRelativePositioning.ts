import { useState, useEffect, MutableRefObject, useRef } from 'react';

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

        if (
            newRect.bottom !== rect.bottom ||
            newRect.top !== rect.top ||
            newRect.left !== rect.left ||
            newRect.right !== rect.right ||
            newRect.width !== rect.width ||
            newRect.height !== rect.height
        ) {
            setRect(newRect);
        }
    };

    useEffect(setRectFromRef, [ref.current]);

    const animationFrame = useRef(0);
    const timer = useRef(0);
    const isStopped = useRef(false);
    const update = () => {
        clearTimeout(timer.current);
        window.cancelAnimationFrame(timer.current);

        if (isStopped.current) {
            return;
        }

        timer.current = setTimeout(() => {
            setRectFromRef();

            animationFrame.current = window.requestAnimationFrame(update);
        });
    };

    useEffect(() => {
        isStopped.current = false;
        animationFrame.current = window.requestAnimationFrame(update);

        return () => {
            window.cancelAnimationFrame(animationFrame.current);
            isStopped.current = true;
        };
    }, [rect]);

    return rect;
};
