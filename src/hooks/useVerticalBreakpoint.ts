import useBreakpoint, { getBreakpoint, Breakpoint } from './useBreakpoint';

export type VerticalBreakpoint = Breakpoint & {
    height: number,
};

export default (breakpoints: VerticalBreakpoint[]) => {
    const [ref, currentBreakpoints] = useBreakpoint(rect => {
        return [getBreakpoint(breakpoints, rect, x => x.height)];
    });

    return [ref, currentBreakpoints[0]];
};
