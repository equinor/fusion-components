import {useState, useRef, useEffect, MutableRefObject} from 'react';
import useEventListener from './useEventListener';

export type Breakpoint = {
    key: string,
};

export const getBreakpoint = <T extends Breakpoint>(breakpoints: T[], nodeRect: ClientRect, accessor: (x: T|ClientRect) => number): T => {
    const breakpointValues = breakpoints
        .filter(breakpoint => accessor(breakpoint) <= accessor(nodeRect))
        .map(breakpoint => accessor(breakpoint));
    const maxBreakpoint = Math.max(...breakpointValues);

    return breakpoints.find(breakpoint => accessor(breakpoint) === maxBreakpoint)

}

const useBreakpoint = <T extends Breakpoint>(checkSize: (rect: ClientRect) => T[]): [MutableRefObject<HTMLDivElement>, T[]] => {
    const [currentBreakpoints, setCurrentBreakpoints] = useState<T[]>([]);
    const nodeRef = useRef<HTMLDivElement>(null);

    const performCheckSize = () => {
        if (!nodeRef.current) {
            return;
        }

        const nodeRect = nodeRef.current.getBoundingClientRect();
        setCurrentBreakpoints(checkSize(nodeRect));
    };

    useEventListener(window, 'resize', performCheckSize, [], true);

    useEffect(performCheckSize, [])

    return [nodeRef, currentBreakpoints];
};

export default useBreakpoint;


