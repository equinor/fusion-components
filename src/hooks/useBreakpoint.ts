import { useState, useRef, useEffect, MutableRefObject } from 'react';
import useEventListener from './useEventListener';

export type Breakpoint = {
    key: string;
};

export const getBreakpoint = <T extends Breakpoint>(
    breakpoints: T[],
    nodeRect: ClientRect,
    accessor: (x: T | ClientRect) => number
): string => {
    const breakpointValues = breakpoints
        .filter(breakpoint => accessor(breakpoint) <= accessor(nodeRect))
        .map(breakpoint => accessor(breakpoint));
    const maxBreakpoint = Math.max(...breakpointValues);

    const result = breakpoints.find(breakpoint => accessor(breakpoint) === maxBreakpoint) as T;
    return result.key;
};

const useBreakpoint = (
    checkSize: (rect: ClientRect) => string[]
): [MutableRefObject<HTMLDivElement>, string[]] => {
    const [currentBreakpoints, setCurrentBreakpoints] = useState<string[]>([]);
    const nodeRef = useRef<HTMLDivElement>(null);

    const performCheckSize = () => {
        window.requestAnimationFrame(() => {
            if (!nodeRef.current) {
                return;
            }

            const nodeRect = nodeRef.current.getBoundingClientRect();
            setCurrentBreakpoints(checkSize(nodeRect));
        });
    };

    useEventListener(window, 'resize', performCheckSize, [], true);
    useEffect(performCheckSize, [nodeRef.current]);

    return [nodeRef as MutableRefObject<HTMLDivElement>, currentBreakpoints];
};

export default useBreakpoint;
