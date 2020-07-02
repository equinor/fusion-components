import React, { FC, useRef, useMemo, useContext } from 'react';
import useReportingPathActions from './actions';
import {
    ReportingPathContextProvider,
    ReportingPathContextReducer,
    ReportingPathContext,
} from './store';
import Children from './components/Children';
import Links from './components/Links';
import LinkedIndicator from './components/LinkedIndicator';
import { OrgChartItemProps, OrgStructure } from '../OrgChart/orgChartTypes';
import useParentSize from 'hooks/useParentSize';

export type ReportingPathProps<T> = {
    structure: T[];
    component: FC<OrgChartItemProps<T>> | null;
    cardWidth?: number;
    cardHeight?: number;
    cardMargin?: number;
    rowMargin?: number;
};
const ReportingPath = <T extends OrgStructure>(props: ReportingPathProps<T>) => (
    <ReportingPathContextProvider>
        <ReportingPathContent {...props} />
    </ReportingPathContextProvider>
);

const ReportingPathContent = <T extends OrgStructure>(props: ReportingPathProps<T>) => {
    const orgContainerRef = useRef<SVGSVGElement | null>(null);
    const { height, width } = useParentSize(orgContainerRef);
        
    useReportingPathActions({ ...props, parentHeight: height, parentWidth: width});

    const {
        state: { rowMargin, childrenRows, cardWidth,allNodes },
    } = useContext<ReportingPathContextReducer<T>>(ReportingPathContext);

    const svgHeight = useMemo(() => {

        const childrenMargin = rowMargin * childrenRows;
        const linkedRows = allNodes.filter(node => node.linked);
        const linkedMargin = linkedRows.length ? linkedRows.length * rowMargin : 0;

        return childrenMargin  + linkedMargin;
    }, [rowMargin, childrenRows, allNodes]);

    return (
        <svg
            ref={orgContainerRef}
            width={cardWidth * 1.4}
            height={svgHeight}
            viewBox={`0 0 ${cardWidth} ${svgHeight}`}
        >
            <Links />
            <Children />
            <LinkedIndicator />
        </svg>
    );
};

export default ReportingPath;
