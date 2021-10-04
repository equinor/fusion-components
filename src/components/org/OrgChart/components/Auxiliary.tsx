import { Fragment, useCallback, useContext } from 'react';
import { Auxiliary } from '../orgChartTypes';

import styles from './styles.less';
import { OrgChartContextReducer, OrgChartContext } from '../store';
import { clsx } from '@equinor/fusion-react-styles';

const Auxiliary = () => {
    const {
        state: {
            auxiliaryComponent,
            auxiliaries,
            centerX,
            cardWidth,
            numberOfCardsPerRow,
            auxiliaryWidth,
            auxiliaryHeight,
            auxiliaryMargin,
        },
    } = useContext<OrgChartContextReducer<any>>(OrgChartContext);

    const x = centerX - cardWidth / 2;
    const y = 0;

    const renderLink = useCallback(
        (auxiliary: Auxiliary, index: number) => {
            const path = `
            M ${x + cardWidth + auxiliaryWidth * (index + 1)} ${y + auxiliaryHeight / 2 + 0.5} 
            H ${x + cardWidth / 2}
            `;

            const classNames = clsx(styles.link, {
                [styles.isDisconnected]: !auxiliary.connected,
            })
            return <path d={path} className={classNames} />;
        },
        [auxiliaryHeight, auxiliaryWidth, x, y]
    );
    console.log(x);
    const renderComponent = useCallback(
        (auxiliary: Auxiliary, index: number) => {
            const componentX =
                x +
                // auxiliaryMargin * 2 +
                cardWidth / 2 +
                (auxiliaryWidth + auxiliaryMargin) * (index + 1);
            const componentY = y;

            const AuxiliaryComponent = auxiliaryComponent;
            return (
                <Fragment key={index + 'auxiliary'}>
                    <rect
                        x={componentX}
                        y={componentY}
                        width={auxiliaryWidth}
                        height={auxiliaryHeight}
                        className={styles.breadCrumbRect}
                    />
                    <foreignObject
                        x={componentX}
                        y={componentY}
                        width={auxiliaryWidth}
                        height={auxiliaryHeight}
                    >
                        {AuxiliaryComponent && (
                            <AuxiliaryComponent
                                component={auxiliary.component}
                                id={auxiliary.id}
                                childId={auxiliary.childId}
                            />
                        )}
                    </foreignObject>
                </Fragment>
            );
        },
        [auxiliaries, x, y, auxiliaryComponent]
    );

    if (!auxiliaries || numberOfCardsPerRow === 1) {
        return null;
    }

    return (
        <g className="auxiliaries">
            {auxiliaries.map((auxiliary, index) => {
                return renderLink(auxiliary, index);
            })}
            {auxiliaries.map((auxiliary, index) => {
                return renderComponent(auxiliary, index);
            })}
        </g>
    );
};

export default Auxiliary;
