import { FC, useContext } from 'react';
import { OrgChartContext, OrgChartContextReducer } from '../../../store';
import styles from '../../styles.less';

type VerticalBreadCrumbLinkProps = {
    index: number;
};

const VerticalBreadCrumbLink: FC<VerticalBreadCrumbLinkProps> = ({ index }) => {
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

    const startXPosition = numberOfCardsPerRow === 1 ? cardWidth / 2 + 0.5 : centerX + 0.5;
    const path = `
    M ${startXPosition} ${
        (breadCrumbHeight + breadCrumbMargin) * (index + 1) + breadCrumbHeight / 2
    }
    V ${startYPosition + (cardMargin + cardHeight) / 2}
    `;
    return <path d={path} className={styles.link} />;
};
export default VerticalBreadCrumbLink;
