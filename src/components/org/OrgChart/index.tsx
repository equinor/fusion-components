import React, { useRef, useState, useEffect } from 'react';
import useParentSize from './hooks/useParentSize';
import { OrgChartContextType, OrgChartContext } from './context';
import { OrgStructure, OrgChartProps, OrgNode } from './orgChartTypes';
import Links from './components/Links';
import Root from './components/Root';
import Aside from './components/Aside';
import Children from './components/Children';

function OrgChart<T extends OrgStructure>({
    structure,
    cardWidth = 380,
    cardHeight = 132,
    cardMargin = 25,
    rowMargin = 175,
    component,
}: OrgChartProps<T>) {
    const orgContainerRef = useRef<SVGSVGElement | null>(null);
    const [parentHeight, parentWidth] = useParentSize(orgContainerRef);

    useEffect(() => {
        setOrgChartState({
            ...orgChartState,
            height: parentHeight,
            width: parentWidth,
            centerX: parentWidth / 2,
            centerY: parentHeight / 2,
        });
    }, [parentHeight, parentWidth]);

    const updatePosition = (node: OrgNode<T>, x: number, y: number) => {
        setOrgChartState(prevState => {
            return {
                ...prevState,
                allNodes: prevState.allNodes.map(prevNode => {
                    if (prevNode.id === node.id) {
                        return {
                            ...node,
                            x,
                            y,
                        };
                    } else {
                        return prevNode;
                    }
                }),
            };
        });
    };

    const updateAsideRows = (asideRows: number) => {
        setOrgChartState({
            ...orgChartState,
            asideRows:asideRows,
        });
    };

    const updateChildrenRows = (rows: number) => {
        setOrgChartState(prevState => ({
            ...prevState,
            childrenRows: rows,
        }));
    };
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


    const [orgChartState, setOrgChartState] = useState<OrgChartContextType<T>>({
        height: parentHeight,
        width: parentWidth,
        centerX: parentWidth / 2,
        centerY: parentHeight / 2,
        cardWidth,
        cardHeight,
        cardMargin,
        rowMargin,
        component,
        asideRows: 0,
        childrenRows: 0,
        allNodes: generateNodes(structure),
        updatePosition: (node, x, y) => updatePosition(node, x, y),
        updateAsideRows: (rows: number) => updateAsideRows(rows),
        updateChildrenRows: (rows: number) => updateChildrenRows(rows),
    });
    return (
        <OrgChartContext.Provider value={orgChartState}>
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
            </svg>
        </OrgChartContext.Provider>
    );
}

export default OrgChart;
