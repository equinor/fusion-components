import { OrgNode } from '.';
import { useCallback, useContext, useMemo } from 'react';
import { OrgChartContextReducer, OrgChartContext } from './store';

export default <T>(rows: OrgNode<T>[][], isAside?: boolean) => {
    const {
        state: { rowMargin, numberOfCardsPerRow, additionalAsideRowHeight },
    } = useContext<OrgChartContextReducer<T>>(OrgChartContext);

    const getAdditionalRowHeight = useCallback(
        (cards: OrgNode<T>[]) => {
            const greatestAdditionPersons = cards.reduce((highest: number, card: OrgNode<T>) => {
                if (card.numberOfAssignees && card.numberOfAssignees > highest) {
                    return card.numberOfAssignees;
                }
                return highest;
            }, 0);
            if (greatestAdditionPersons === 0) {
                return 0;
            }
            return (
                Math.ceil(greatestAdditionPersons / 3) *
                (numberOfCardsPerRow === 1 ? rowMargin - 20 : rowMargin)
            );
        },
        [numberOfCardsPerRow, rowMargin]
    );

    const additionalRowHeight = useMemo(
        () =>
            rows.reduce((additionalHeight: number[], _: OrgNode<T>[], index: number) => {
                const previousHeight = additionalHeight.reduce(
                    (totalHeight: number, height: number) => totalHeight + height,
                    0
                );
                if (index === 0) {
                    return [...additionalHeight, isAside ? 0 : additionalAsideRowHeight];
                }
                const currentRowHeight = getAdditionalRowHeight(rows[index - 1]);
                return [...additionalHeight, previousHeight + currentRowHeight];
            }, []),
        [rows, numberOfCardsPerRow, rowMargin]
    );

    return additionalRowHeight;
};
