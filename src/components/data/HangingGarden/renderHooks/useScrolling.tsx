import { useRef, RefObject, MutableRefObject, useCallback, UIEvent } from 'react';
import { HangingGardenColumn, HangingGardenColumnIndex } from '../models/HangingGarden';

export type Scroll<T extends HangingGardenColumnIndex> = {
    isScrolling: MutableRefObject<boolean>;
    scrollLeft: MutableRefObject<number>;
    scrollTop: MutableRefObject<number>;
    onScroll: (e: UIEvent<HTMLDivElement>, renderGarden: () => void) => void;
    scrollToHighlightedColumn: (
        columns: HangingGardenColumn<T>[],
        highlightedColumnKey: string,
        itemWidth: number
    ) => boolean;
    scrollToHighlightedItem: (
        columns: HangingGardenColumn<T>[],
        highlightedItem: T,
        itemWidth: number
    ) => boolean;
};
/**
 * Handles scrolling off the garden canvas. Also handles scroll to functionality.
 * Scrolling to highlighted Item and Header.
 *
 * This hook is used by the Garden and is not intended to be used or implemented
 * outside the Garden component.
 */
const useScrolling = <T extends HangingGardenColumnIndex>(
    canvas: RefObject<HTMLCanvasElement> | null,
    container: RefObject<HTMLDivElement> | null,
    itemKeyProp: keyof T
): Scroll<T> => {
    const isScrolling = useRef(false);
    const scrollTop = useRef(0);
    const scrollLeft = useRef(0);

    const onScroll = useCallback(
        (e: UIEvent<HTMLDivElement>, renderGarden: () => void) => {
            if (isScrolling.current || !canvas?.current) return;

            isScrolling.current = true;
            scrollLeft.current = e.currentTarget.scrollLeft;
            scrollTop.current = e.currentTarget.scrollTop;
            canvas.current.style.transform = `translate(${e.currentTarget.scrollLeft}px, ${e.currentTarget.scrollTop}px)`;
            window.requestAnimationFrame(() => {
                renderGarden();
                isScrolling.current = false;
            });
        },
        [canvas?.current, isScrolling?.current]
    );

    const scrollTo = useCallback(
        (highlightedColumnIndex: number, itemWidth: number): boolean => {
            if (!container?.current) return false;

            if (container.current.scrollWidth <= container.current.offsetWidth) {
                scrollLeft.current = container.current.scrollLeft = 0;
                return false;
            }

            scrollLeft.current =
                highlightedColumnIndex >= 0
                    ? (container.current.scrollLeft =
                          highlightedColumnIndex * itemWidth -
                          container.current.offsetWidth / 2 +
                          itemWidth / 2)
                    : 0;

            return scrollLeft.current !== 0;
        },
        [container?.current]
    );

    const scrollToHighlightedColumn = useCallback(
        (
            columns: HangingGardenColumn<T>[],
            highlightedColumnKey: string,
            itemWidth: number
        ): boolean => {
            const highlightedColumnIndex = columns.findIndex(
                (column) => column.key === highlightedColumnKey
            );

            return scrollTo(highlightedColumnIndex, itemWidth);
        },
        [scrollTo]
    );

    const scrollToHighlightedItem = useCallback(
        (
            columns: HangingGardenColumn<T>[],
            highlightedItem: T | null,
            itemWidth: number
        ): boolean => {
            if (!highlightedItem) return false;
            const highlightedIndex = columns.findIndex((column) =>
                column.data.some((item) => {
                    return item[itemKeyProp] === highlightedItem[itemKeyProp];
                })
            );

            return scrollTo(highlightedIndex, itemWidth);
        },
        [scrollTo, itemKeyProp]
    );

    return {
        isScrolling,
        scrollLeft,
        scrollTop,
        onScroll,
        scrollToHighlightedColumn,
        scrollToHighlightedItem,
    };
};

export default useScrolling;
