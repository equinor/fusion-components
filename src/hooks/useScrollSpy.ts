import { useState, useRef, useEffect, MutableRefObject } from 'react';
import useEventListener from './useEventListener';

export type Scroll = {
    scrollLeft: number,
    scrollTop: number,
};

const useScrollSpy = (
    parentContainersOnly: boolean = true,
    immediateParentOnly: boolean
): [MutableRefObject<HTMLDivElement>, Scroll] => {
    const [scrollTop, setScrollTop] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const nodeRef = useRef<HTMLDivElement>(null);

    const shouldNotify = (node: HTMLDivElement) => {
        if (!node) {
            return;
        }

        if (immediateParentOnly) {
            return node.parentNode === node;
        }

        if (parentContainersOnly) {
            return node.contains(node);
        }

        return true;
    };

    const notify = () => {
        if (!nodeRef.current) {
            return;
        }

        const node = nodeRef.current;
        if (shouldNotify(node)) {
            setScrollTop(node.scrollTop);
            setScrollLeft(node.scrollLeft);
        }
    };

    useEventListener(document.body, 'scroll', notify, [], true);
    useEffect(notify, []);

    const scroll: Scroll = {
        scrollLeft,
        scrollTop,
    };

    return [nodeRef as MutableRefObject<HTMLDivElement>, scroll];
};

export default useScrollSpy;
