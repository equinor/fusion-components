import { FC, useContext } from 'react';
import { OrgChartContext, OrgChartContextReducer } from '../../../store';
import styles from '../../styles.less';

type HorizontalBreadCrumbLinkProps = {
    index: number;
};

const HorizontalBreadCrumbLink: FC<HorizontalBreadCrumbLinkProps> = ({ index }) => {
    const {
        state: {
            cardWidth,
            breadCrumbWidth,
            breadCrumbHeight,
            cardMargin,
            startYPosition,
            centerX,
        },
    } = useContext<OrgChartContextReducer>(OrgChartContext);

    const startXPosition = centerX - cardWidth / 2;
    const path = `
    M ${startXPosition - breadCrumbWidth * (index + 1)} ${
        startYPosition + breadCrumbHeight / 2 + 0.5 + cardMargin / 2
    }
    H ${startXPosition + cardWidth / 2}
    `;
    return <path d={path} className={styles.link} />;
};
export default HorizontalBreadCrumbLink;
