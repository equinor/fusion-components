import { useRef, useMemo, useContext } from 'react';
import { useParentSize } from '@equinor/fusion-components';
import { OrgChartContextProvider, OrgChartContextReducer, OrgChartContext } from './store';
import { OrgStructure, OrgChartProps, OrgChartItemProps, OrgNode } from './orgChartTypes';
import Links from './components/Links';
import Root from './components/Root';
import Aside from './components/Aside';
import Children from './components/Children';
import Labels from './components/Labels';
import useOrgChartActions from './actions';
import BreadCrumbs from './components/BreadCrumbs';

export { OrgStructure, OrgChartItemProps, OrgNode };

const OrgChart = <T extends OrgStructure>(props: OrgChartProps<T>) => (
    <OrgChartContextProvider>
        <OrgChartContent {...props} />
    </OrgChartContextProvider>
);

const OrgChartContent = <T extends OrgStructure>(props: OrgChartProps<T>) => {
    const orgContainerRef = useRef<SVGSVGElement | null>(null);
    const { height, width } = useParentSize(orgContainerRef);

    useOrgChartActions({ ...props, parentHeight: height, parentWidth: width });

    const {
        state: {
            rowMargin,
            asideRows,
            childrenRows,
            additionalAsideRowHeight,
            additionalChildRowHeight,
        },
    } = useContext<OrgChartContextReducer<T>>(OrgChartContext);

    const svgHeight = useMemo(() => {
        const rootMargin = rowMargin;
        const labelMargin = 60;
        const asideMargin = (rowMargin - 20) * asideRows;
        const childrenMargin = rowMargin * childrenRows;
        return (
            asideMargin +
            childrenMargin +
            rootMargin +
            labelMargin +
            additionalAsideRowHeight +
            additionalChildRowHeight
        );
    }, [rowMargin, asideRows, childrenRows, additionalAsideRowHeight, additionalChildRowHeight]);

    return (
        <svg
            ref={orgContainerRef}
            width={width}
            height={svgHeight}
            viewBox={`0 0 ${width} ${svgHeight}`}
        >
            <Links />
            <Aside />
            <BreadCrumbs />
            <Root />
            <Children />
            <Labels />
        </svg>
    );
};

export default OrgChart;
