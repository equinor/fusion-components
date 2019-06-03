import useBreakpoint, { getBreakpoint, Breakpoint } from './useBreakpoint';
import { MutableRefObject } from 'react';

export type VerticalBreakpoint = Breakpoint & {
    height: number,
};

export default (
    breakpoints: VerticalBreakpoint[]
): [MutableRefObject<HTMLDivElement>, string | null] => {
    const [ref, currentBreakpoints] = useBreakpoint(rect => {
        return [getBreakpoint(breakpoints, rect, x => x.height)];
    });

    return [ref, currentBreakpoints[0] || null];
};
