import { useEffect, useState, useRef, MutableRefObject, Dispatch } from 'react';

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
    ref: MutableRefObject<T>,
    margin = 1
): [boolean, Dispatch<boolean>] => {
    const getIsInView = () => {
        if (!ref || !ref.current) {
            return true;
        }

        return isCompletelyInView(ref.current, margin);
    };

    const [isInView, setIsInView] = useState(getIsInView());

    const animationFrame = useRef(0);
    const timer = useRef<NodeJS.Timeout>(null);
    const checkIsInView = () => {
        clearTimeout(timer.current);
        window.cancelAnimationFrame(animationFrame.current);
        timer.current = setTimeout(() => {
            setIsInView(getIsInView());
            animationFrame.current = window.requestAnimationFrame(checkIsInView);
        });
    };

    useEffect(() => {
        checkIsInView();

        return () => {
            clearTimeout(timer.current);
            window.cancelAnimationFrame(animationFrame.current);
        };
    }, []);

    return [isInView, setIsInView];
};
