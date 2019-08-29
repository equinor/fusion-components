import React, { FC, useRef, useMemo, useContext } from 'react';
import { OrgStructure, OrgChartItemProps, useParentSize } from '@equinor/fusion-components';
import Root from './components/Root';
import useReportingPathActions from './actions';
import {
    ReportingPathContextProvider,
    ReportingPathContextReducer,
    ReportingPathContext,
} from './store';
import Children from './components/Children';
import Links from './components/Links';

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
        state: { rowMargin, childrenRows, cardWidth },
    } = useContext<ReportingPathContextReducer<T>>(ReportingPathContext);

    const svgHeight = useMemo(() => {
        const rootMargin = rowMargin;

        const childrenMargin = rowMargin * childrenRows;
        return childrenMargin + rootMargin;
    }, [rowMargin, childrenRows]);

    return (
        <svg
            ref={orgContainerRef}
            width={cardWidth}
            height={svgHeight}
            viewBox={`0 0 ${cardWidth} ${svgHeight}`}
        >
            <Links />
            <Root />
            <Children />
        </svg>
    );
};

export default ReportingPath;
