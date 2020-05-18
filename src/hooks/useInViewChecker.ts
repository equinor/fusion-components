import React, { useEffect, useState, useRef } from 'react';

const isCompletelyInView = (el: HTMLElement, margin = 1) => {
    const rect = el.getBoundingClientRect();
    return (
        el.contains(document.elementFromPoint(rect.left + margin, rect.top + margin)) &&
        el.contains(document.elementFromPoint(rect.left + margin, rect.bottom - margin)) &&
        el.contains(document.elementFromPoint(rect.right - margin, rect.top + margin)) &&
        el.contains(document.elementFromPoint(rect.right - margin, rect.bottom - margin))
    );
};

export default <T extends HTMLElement>(
    ref: React.MutableRefObject<T>,
    margin: number = 1
): [boolean, React.Dispatch<boolean>] => {
    const getIsInView = () => {
        if (!ref || !ref.current) {
            return true;
        }

        return isCompletelyInView(ref.current, margin);
    };

    const [isInView, setIsInView] = useState(getIsInView());

    const animationFrame = useRef(0);
    const checkIsInView = () => {
        window.cancelAnimationFrame(animationFrame.current);

        setIsInView(getIsInView());

        animationFrame.current = window.requestAnimationFrame(checkIsInView);
    };

    useEffect(() => {
        checkIsInView();
        return () => {
            window.cancelAnimationFrame(animationFrame.current);
        };
    }, []);

    return [isInView, setIsInView];
};
