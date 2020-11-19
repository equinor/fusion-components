import * as React from 'react';
import WorkOrderType from '../models/WorkOrderType';
import { ModalSideSheet } from '../../../../../..';

type workOrderSideSheetProps = {
    workOrder: WorkOrderType;
    setSelectedWorkOrder: (wo: WorkOrderType | null) => void;
};

const WorkOrderSideSheet: React.FC<workOrderSideSheetProps> = ({
    workOrder,
    setSelectedWorkOrder,
}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        setIsOpen(true);
    }, [workOrder]);

    return (
        <ModalSideSheet
            header={workOrder.workOrderNumber}
            show={isOpen}
            size={'small'}
            onClose={() => {
                setIsOpen(false);
                setSelectedWorkOrder(null);
            }}
            id={workOrder.workOrderNumber}
        >
            <p>{workOrder.description}</p>
        </ModalSideSheet>
    );
};

export default WorkOrderSideSheet;
