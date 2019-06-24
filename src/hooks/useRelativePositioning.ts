import { useState, useEffect, MutableRefObject } from 'react';

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
            console.log("SET RECT", newRect, rect);
            setRect(newRect);
        }
    };

    useEffect(setRectFromRef, [ref.current]);

    let animationFrame: number;
    let isStopped = false;
    const update = () => {
        if (isStopped) {
            return;
        }

        setRectFromRef();

        animationFrame = window.requestAnimationFrame(update);
    };

    useEffect(() => {
        animationFrame = window.requestAnimationFrame(update);

        return () => {
            window.cancelAnimationFrame(animationFrame);
            isStopped = true;
        };
    }, [rect]);

    return rect;
};
