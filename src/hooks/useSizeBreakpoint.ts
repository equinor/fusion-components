import useBreakpoint, { getBreakpoint } from './useBreakpoint';
import { HorizontalBreakpoint } from './useHorizontalBreakpoint';
import { VerticalBreakpoint } from './useVerticalBreakpoint';
import { MutableRefObject } from 'react';

export default (
    verticalBreakpoints: VerticalBreakpoint[],
    horizontalBreakpoints: HorizontalBreakpoint[]
): [MutableRefObject<HTMLDivElement>, string[] | null] => {
    const [ref, currentBreakpoints] = useBreakpoint(rect => {
        const verticalBreakpoint = getBreakpoint(verticalBreakpoints, rect, x => x.height);
        const horizontalBreakpoint = getBreakpoint(horizontalBreakpoints, rect, x => x.width);

        return [verticalBreakpoint, horizontalBreakpoint];
    });

    return [ref, currentBreakpoints || null];
};
