import useBreakpoint, { getBreakpoint, Breakpoint } from './useBreakpoint';
import { MutableRefObject } from 'react';

export type HorizontalBreakpoint = Breakpoint & {
    width: number,
};

export default (
    breakpoints: HorizontalBreakpoint[]
): [MutableRefObject<HTMLDivElement>, HorizontalBreakpoint] => {
    const [ref, currentBreakpoints] = useBreakpoint(rect => {
        return [getBreakpoint(breakpoints, rect, x => x.width)];
    });

    return [ref, currentBreakpoints[0]];
};
