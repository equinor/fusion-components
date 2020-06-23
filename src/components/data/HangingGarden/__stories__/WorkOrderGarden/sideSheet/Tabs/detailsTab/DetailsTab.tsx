import * as React from 'react';
import * as styles from './styles.less';
import * as moment from 'moment';
import { materialStatusMap } from '../../../helpers';

import WorkOrderType from '../../../models/WorkOrderType';
import { getWoStatus } from '../../../utils/procosys';

type DetailsTabProps = {
    workOrder: WorkOrderType;
};

const DetailsTab: React.FC<DetailsTabProps> = ({ workOrder }) => {
    const plannedStartDate = moment(workOrder.plannedStartDate, 'YYYY/MM/DD').format('DD.MM.YYYY');
    const plannedFinishDate = moment(workOrder.plannedFinishDate, 'YYYY/MM/DD').format(
        'DD.MM.YYYY'
    );
    return (
        <div className={styles.details}>
            <table className={styles.table}>
                <tbody>
                    <tr key={'range'}>
                        <td key={'1'}>
                            <strong>Range</strong>
                        </td>
                        <td key={'2'}>
                            {plannedStartDate} - {plannedFinishDate}
                        </td>
                    </tr>
                    <tr key={'status'}>
                        <td key={'3'}>
                            <strong>Status</strong>
                        </td>
                        <td key={'4'}>{getWoStatus(workOrder)}</td>
                    </tr>
                    <tr key={'disipline'}>
                        <td key={'5'}>
                            <strong>Discipline</strong>
                        </td>
                        <td key={'6'}>{workOrder.discipline}</td>
                    </tr>
                    <tr key={'project'}>
                        <td key={'26'}>
                            <strong>Project</strong>
                        </td>
                        <td
                            key={'27'}
                        >{`${workOrder.projectIdentifier}, ${workOrder.projectDescription}`}</td>
                    </tr>
                    <tr key={'responsible'}>
                        <td key={'7'}>
                            <strong>Responsible</strong>
                        </td>
                        <td key={'8'}>{workOrder.responsible}</td>
                    </tr>
                    <tr key={'milestone'}>
                        <td key={'9'}>
                            <strong>Milestone</strong>
                        </td>
                        <td key={'10'}>{workOrder.milestone}</td>
                    </tr>
                    <tr key={'projectprogress'}>
                        <td key={'11'}>
                            <strong>Project progress</strong>
                        </td>
                        <td key={'12'}>{workOrder.projectProgress}%</td>
                    </tr>
                    <tr key={'estimatedmanhours'}>
                        <td key={'13'}>
                            <strong>Estimated manhours</strong>
                        </td>
                        <td key={'14'}>{workOrder.estimatedHours}h</td>
                    </tr>
                    <tr key={'remainingmanhours'}>
                        <td key={'15'}>
                            <strong>Remaining manhours</strong>
                        </td>
                        <td key={'16'}>{workOrder.remainingHours}h</td>
                    </tr>
                    <tr key={'expandedmanhours'}>
                        <td key={'17'}>
                            <strong>Expended manhours</strong>
                        </td>
                        <td key={'26'}>{workOrder.expendedHours}h</td>
                    </tr>
                    <tr key={'hold'}>
                        <td key={'18'}>
                            <strong>Hold</strong>
                        </td>
                        <td key={'19'}>
                            {workOrder.holdBy} {workOrder.holdByDescription}
                        </td>
                    </tr>
                    <tr key={'materialstatus'}>
                        <td key={'20'}>
                            <strong>Material status</strong>
                        </td>
                        <td key={'21'}>
                            {workOrder.materialStatus} {materialStatusMap[workOrder.materialStatus]}
                        </td>
                    </tr>
                    <tr key={'materialcomments'}>
                        <td key={'22'}>
                            <strong>Material Comments</strong>
                        </td>
                        <td key={'23'}>{workOrder.materialComments}</td>
                    </tr>
                    <tr key={'constrctionscomments'}>
                        <td key={'24'}>
                            <strong>Construction Comments</strong>
                        </td>
                        <td key={'25'}>{workOrder.constructionComments}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default DetailsTab;
