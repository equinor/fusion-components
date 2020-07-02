import { useEffect, useContext } from 'react';
import { ReportingPathContextReducer, ReportingPathContext } from './store';
import { ReportingPathProps } from '.';
import { OrgStructure, OrgNode } from '../OrgChart/orgChartTypes';

type ReportingPathActionProps<T> = ReportingPathProps<T> & {
    parentHeight: number;
    parentWidth: number;
};

const useReportingPathActions = <T extends OrgStructure>({
    structure,
    cardWidth = 340,
    cardHeight = 132,
    cardMargin = 16,
    rowMargin = 140,
    component,
    parentHeight,
    parentWidth,
}: ReportingPathActionProps<T>) => {
    const { dispatch } = useContext<ReportingPathContextReducer<T>>(ReportingPathContext);

    const generateNodes = (structure: T[]): OrgNode<T>[] => {
        return structure.map(item => {
            return {
                id: item.id,
                parentId: item.parentId,
                x: 0,
                y: 0,
                data: item,
                aside: item.aside,
                linked: item.linked,
            };
        });
    };

    useEffect(() => {
        dispatch({
            type: 'UPDATE_NODES',
            nodes: generateNodes(structure),
        });
    }, [structure]);

    useEffect(() => {
        if (component ) {
            dispatch({
                type: 'UPDATE_COMPONENT',
                component: component
            });
        }
    }, [component]);

    useEffect(() => {
        dispatch({
            type: 'UPDATE_CARD_SIZE',
            height: cardHeight,
            width: cardWidth,
            margin: cardMargin,
            initialWidth: cardWidth,
        });
    }, [cardHeight, cardWidth, cardMargin]);

    useEffect(() => {
        if (rowMargin) {
            dispatch({
                type: 'UPDATE_ROW_MARGIN',
                margin: rowMargin,
            });
        }
    }, [rowMargin]);

    useEffect(() => {
        dispatch({
            type: 'UPDATE_SIZE',
            height: parentHeight,
            width: parentWidth,
        });
       
    }, [parentHeight, parentWidth]);
};

export default useReportingPathActions;
