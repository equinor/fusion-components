import React, { useRef, useEffect, useContext } from 'react';
import useParentSize from './hooks/useParentSize';
import { OrgChartContext, OrgChartContextReducer, OrgChartContextProvider } from './store';
import { OrgStructure, OrgChartProps, OrgNode, OrgChartItemProps } from './orgChartTypes';
import Links from './components/Links';
import Root from './components/Root';
import Aside from './components/Aside';
import Children from './components/Children';
import Labels from './components/Labels';

export { OrgStructure, OrgChartItemProps };

const OrgChart = <T extends OrgStructure>(props: OrgChartProps<T>) => (
    <OrgChartContextProvider>
        <OrgChartContent {...props} />
    </OrgChartContextProvider>
);

const OrgChartContent = <T extends OrgStructure>({
    structure,
    cardWidth = 320,
    cardHeight = 112,
    cardMargin = 16,
    rowMargin = 128,
    component,
    childrenLabel,
    asideLabel,
}: OrgChartProps<T>) => {
    const orgContainerRef = useRef<SVGSVGElement | null>(null);
    const [parentHeight, parentWidth] = useParentSize(orgContainerRef);
    const { dispatch } = useContext<OrgChartContextReducer<T>>(OrgChartContext);

    const generateNodes = (structure: T[]): OrgNode<T>[] => {
        return structure.map(item => {
            return {
                id: item.id,
                parentId: item.parentId,
                x: 0,
                y: 0,
                data: item,
                aside: item.aside,
            };
        });
    };

    useEffect(() => {
        dispatch({
            type: 'UPDATE_LABELS',
            asideLabel: asideLabel,
            childrenLabel: childrenLabel,
        });
    }, [asideLabel, childrenLabel]);

    useEffect(() => {
        dispatch({
            type: 'UPDATE_SIZE',
            height: parentHeight,
            width: parentWidth,
        });
        dispatch({
            type: 'UPDATE_CENTER',
            x: parentWidth / 2,
            y: parentWidth / 2,
        });
    }, [parentHeight, parentWidth]);

    useEffect(() => {
        dispatch({
            type: 'UPDATE_NODES',
            nodes: generateNodes(structure),
        });
    }, [structure]);

    useEffect(() => {
        if (component) {
            dispatch({
                type: 'UPDATE_COMPONENT',
                component: component,
            });
        }
    }, [component]);

    useEffect(() => {
        dispatch({
            type: 'UPDATE_CARD_SIZE',
            height: cardHeight,
            width: cardWidth,
            margin: cardMargin,
        });
    }, [cardHeight, cardWidth, cardMargin]);

    useEffect(() => {
        dispatch({
            type: 'UPDATE_ROW_MARGIN',
            margin: rowMargin,
        });
    }, [rowMargin]);

    return (
        <svg
            ref={orgContainerRef}
            width={parentWidth}
            height={parentHeight}
            viewBox={`0 0 ${parentWidth} ${parentHeight}`}
            overflow="auto"
        >
            <Links />
            <Root />
            <Aside />
            <Children />
            <Labels />
        </svg>
    );
};

export default OrgChart;
