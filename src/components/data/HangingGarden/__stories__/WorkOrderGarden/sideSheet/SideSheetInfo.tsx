import * as React from 'react';
import * as styles from './styles.less';
import WorkOrderType from '../models/WorkOrderType';
import DetailsTab from './Tabs/detailsTab/DetailsTab';

type WorkOrderSheetInfoProps = {
    workOrder: WorkOrderType;
};

const WorkOrderSheetInfo: React.FC<WorkOrderSheetInfoProps> = ({ workOrder }) => {
    return (
        <>
            <header className={styles.sideSheetHeader}>
                <p>{workOrder.description}</p>
            </header>
            <div className={styles.sideSheetTabs}>
                <DetailsTab workOrder={workOrder} />
            </div>
        </>
    );
};

export default WorkOrderSheetInfo;
