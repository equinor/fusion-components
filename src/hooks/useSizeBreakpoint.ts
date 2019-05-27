import useBreakpoint, { getBreakpoint, Breakpoint } from './useBreakpoint';
import { HorizontalBreakpoint } from './useHorizontalBreakpoint';
import { VerticalBreakpoint } from './useVerticalBreakpoint';

export default (
    verticalBreakpoints: VerticalBreakpoint[],
    horizontalBreakpoints: HorizontalBreakpoint[]
) => {
    const [ref, currentBreakpoints] = useBreakpoint(rect => {
        const verticalBreakpoint = getBreakpoint(verticalBreakpoints, rect, x => x.height);
        const horizontalBreakpoint = getBreakpoint(horizontalBreakpoints, rect, x => x.width);

        return [verticalBreakpoint, horizontalBreakpoint];
    });

    return [ref, currentBreakpoints];
};
