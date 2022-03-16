import { FC, useContext } from 'react';
import { OrgChartContext, OrgChartContextReducer } from '../../../store';
import styles from '../../styles.less';

type VerticalBreadCrumbLinkProps = {
    index: number;
    totalBreadCrumbsLength: number;
};

const VerticalBreadCrumbLink: FC<VerticalBreadCrumbLinkProps> = ({
    index,
    totalBreadCrumbsLength,
}) => {
    const {
        state: {
            breadCrumbHeight,
            breadCrumbMargin,
            centerX,
            numberOfCardsPerRow,
            cardWidth,
            startYPosition,
            cardHeight,
            cardMargin,
        },
    } = useContext<OrgChartContextReducer>(OrgChartContext);
    const breadCrumbIndex = totalBreadCrumbsLength - index - 1;

    const startXPosition = numberOfCardsPerRow === 1 ? cardWidth / 2 + 0.5 : centerX + 0.5;
    const path = `
    M ${startXPosition} ${startYPosition + (cardMargin + cardHeight) / 2}
    V ${(breadCrumbHeight + breadCrumbMargin) * breadCrumbIndex + breadCrumbHeight / 2}
    `;
    return <path d={path} className={styles.link} />;
};
export default VerticalBreadCrumbLink;
