import { FC } from 'react';
import styles from '../../garden/styles.less';
import WorkOrderType from '../../models/WorkOrderType';

type ProjectPopoverType = {
    item: WorkOrderType;
};

const ProjectPopover: FC<ProjectPopoverType> = ({ item }) => {
    return (
        <div className={styles.woPopover}>
            <section>
                <div>
                    <ul>
                        <li>
                            <b>Project(ProCoSys):</b>
                        </li>
                        <li>{`${item.projectIdentifier}, ${item.projectDescription}`}</li>
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default ProjectPopover;
