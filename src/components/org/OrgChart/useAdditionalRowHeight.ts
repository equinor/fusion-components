import { OrgNode } from '.';
import { useCallback, useContext, useMemo } from 'react';
import { OrgChartContextReducer, OrgChartContext } from './store';

export default <T>(rows: OrgNode<T>[][], isAside?: boolean) => {
    const {
        state: { rowMargin, additionalAsideRowHeight, cardMargin },
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
            const rows = Math.ceil(greatestAdditionPersons / 3);
            const additionalMargin = rows <= 1 ? 0 : 8 * rows;
            return rows * rowMargin - cardMargin * rows - additionalMargin;
        },
        [rowMargin, cardMargin]
    );

    const additionalRowHeight = useMemo(
        () =>
            rows.reduce((additionalHeight: number[], node: OrgNode<T>[], index: number) => {
                const previousHeight = index === 0 ? 0 : additionalHeight[index - 1];
                const isLastRow = index === rows.length - 1;
                const isFirstRow = index === 0;

                if (isAside && isLastRow && isFirstRow) {
                    const rowHeight = getAdditionalRowHeight(node);
                    return [...additionalHeight, 0, rowHeight];
                }
                if (isFirstRow) {
                    const asideRowHeight = isAside ? 0 : additionalAsideRowHeight;

                    return [...additionalHeight, asideRowHeight];
                }

                const currentRowHeight = getAdditionalRowHeight(rows[index - 1]);
                const rowHeight = previousHeight + currentRowHeight;
                if (isLastRow) {
                    const lastRowHeight = getAdditionalRowHeight(node);
                    return [...additionalHeight, rowHeight, rowHeight + lastRowHeight];
                }
                return [...additionalHeight, rowHeight];
            }, []),
        [rows, rowMargin, additionalAsideRowHeight, isAside]
    );

    return additionalRowHeight;
};
