import WorkOrderType from '../models/WorkOrderType';
import { ModalSideSheet } from '../../../../../..';
import { useEffect, useState } from 'react';

type workOrderSideSheetProps = {
    workOrder: WorkOrderType;
    setSelectedWorkOrder: (wo: WorkOrderType | null) => void;
};

const WorkOrderSideSheet: React.FC<workOrderSideSheetProps> = ({
    workOrder,
    setSelectedWorkOrder,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
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
