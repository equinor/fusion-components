import { useState, useRef, useEffect, MutableRefObject } from 'react';
import { enqueueAsyncOperation } from '@equinor/fusion';

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

    const performCheckSize = async (abortSignal: AbortSignal) => {
        enqueueAsyncOperation(() => {
            if (!nodeRef.current) {
                return;
            }

            const nodeRect = nodeRef.current.getBoundingClientRect();
            const breakpoints = checkSize(nodeRect);
            if (
                breakpoints.length !== currentBreakpoints.length ||
                breakpoints.filter(b => currentBreakpoints.indexOf(b) === -1).length > 0
            ) {
                setCurrentBreakpoints(breakpoints);
            }
            performCheckSize(abortSignal);
        }, abortSignal);
    };

    useEffect(() => {
        const abortController = new AbortController();
        performCheckSize(abortController.signal);
        () => abortController.abort();
    }, [nodeRef.current]);

    return [nodeRef as MutableRefObject<HTMLDivElement>, currentBreakpoints];
};

export default useBreakpoint;
