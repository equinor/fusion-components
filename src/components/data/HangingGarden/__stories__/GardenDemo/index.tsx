import * as React from 'react';
import * as PIXI from 'pixi.js';
import * as styles from './styles.less';

import WorkOrderType from './models/WorkOrderType';
import { followUpColorMapHex, getFollowUpStatus, getMatStatusColor } from './helpers';
import { getColumns, getYearAndWeekFromDate } from './columns/columns';
import {
    ItemRenderContext,
    HangingGarden,
    useHangingGardenErrorMessage,
    useHangingGardenData,
    ErrorBoundary,
    ErrorMessage,
    Spinner,
} from '../../../../..';

import ProjectPopover from './components/ProjectPopover';
import { HeaderRenderContext } from '../../models/RenderContext';
import { GardenController, HangingGardenColumn } from '../../models/HangingGarden';

const getItemSearchableValues = (workOrder: WorkOrderType): WorkOrderType => {
    workOrder.searchableValues = [
        workOrder.workOrderNumber,
        workOrder.description,
        workOrder.responsible,
        workOrder.materialStatus,
        workOrder.materialComments,
        workOrder.constructionComments,
    ]
        .filter((value) => value)
        .map((value) => (value ? value.toLowerCase() : null))
        .join();
    return workOrder;
};

const SortWorkOrdersByFilterTerms = (workorders: WorkOrderType[]) =>
    workorders.sort(
        (a, b) => (parseInt(a.projectProgress) || 0) - (parseInt(b.projectProgress) || 0)
    );

const GardenDemo: React.FC = () => {
    const {
        data,
        error,
        isFetching,
        retry,
        invalidate,
        cacheIsInvalid,
        cacheAge,
    } = useHangingGardenData(
        'dataProxy',
        'getWorkOrdersAsync',
        SortWorkOrdersByFilterTerms,
        getItemSearchableValues
    );

    const { errorMessage } = useHangingGardenErrorMessage('handover', error, retry);
    const [selectedWorkOrder, setSelectedWorkOrder] = React.useState<WorkOrderType | null>(null);
    const [columns, setColumns] = React.useState<HangingGardenColumn<WorkOrderType>[]>([]);
    const highlightedKey = getYearAndWeekFromDate(new Date());

    React.useEffect(() => {
        setColumns(getColumns(data));
    }, [data]);

    const getItemWidth = () => {
        const longestKey = Math.max.apply(
            Math,
            data.map((workOrder) => workOrder.workOrderNumber.length)
        );

        return Math.max(longestKey * 8 + 35, 102);
    };

    const renderItem = (item: WorkOrderType, context: ItemRenderContext) => {
        const status = getFollowUpStatus(item);

        context.createRect(
            { x: 0, y: 0 },
            { width: context.width, height: context.height },
            followUpColorMapHex[status]
        );
        context.enquedRender(item.workOrderNumber, (context) => {
            const textNode = context.createTextNode(
                item.workOrderNumber,
                status === 'MaterialAndWoAvailable' ? 0x212121 : 0xffffff
            );
            context.graphics.addChild(textNode);
            textNode.x = 20;
            textNode.y = context.height / 2 - textNode.height / 2;
        });

        context.addDot(getMatStatusColor(item), { x: context.width - 12, y: 8 });
        context.addPopover(
            new PIXI.Rectangle(32, 0, context.width - 32 - 24, context.height),
            () => <ProjectPopover item={item} />
        );
    };

    const renderHeader = (key: string, context: HeaderRenderContext) => {
        const textNode = context.createTextNode(
            context.isExpanded ? key + ' Expanded' || 'NA Expanded' : key || 'NA',
            context.isHighlighted ? 0xffffff : 0x243746
        );

        context.container.addChild(textNode);
        textNode.x = context.width / 2 - textNode.width / 2;
        textNode.y = textNode.height / 2;
    };

    const gardenController = React.useRef<GardenController>(null);

    return (
        <ErrorBoundary>
            <ErrorMessage {...errorMessage}>
                {isFetching && <Spinner title="Fetching Workorders" centered floating />}
                {!isFetching && data.length && (
                    <>
                        <div className={styles.hanginggardenContainer}>
                            <HangingGarden<WorkOrderType>
                                columns={columns}
                                highlightedColumnKey={highlightedKey}
                                highlightedItem={selectedWorkOrder}
                                itemKeyProp={'workOrderId'}
                                itemWidth={getItemWidth()}
                                itemHeight={24}
                                renderItemContext={renderItem}
                                getItemDescription={(item: WorkOrderType) => item.description}
                                onItemClick={(item: WorkOrderType) => setSelectedWorkOrder(item)}
                                headerHeight={40}
                                renderHeaderContext={renderHeader}
                                provideController={gardenController}
                            />
                        </div>
                    </>
                )}
            </ErrorMessage>
        </ErrorBoundary>
    );
};

export default GardenDemo;
