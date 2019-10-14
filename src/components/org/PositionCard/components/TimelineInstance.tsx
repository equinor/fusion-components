import React, { useMemo } from 'react';
import styles from '../styles.less';
import { PositionInstance } from '@equinor/fusion';
import { useTooltipRef } from '@equinor/fusion-components';
import classNames from 'classnames';

type TimelineInstanceProps = {
    instance: PositionInstance;
    currentInstance: PositionInstance | null;
    calculator: (time: number) => number;
};
const TimelineInstance: React.FC<TimelineInstanceProps> = ({
    instance,
    currentInstance,
    calculator,
}) => {
    const assignedPersonName = instance.assignedPerson ? instance.assignedPerson.name : 'TBN';
    const assignedPersonTooltipRef = useTooltipRef(assignedPersonName, 'above');


    const timelineInstanceClasses = classNames(styles.instance, {
        [styles.isCurrent]: currentInstance && currentInstance.id === instance.id,
        [styles.isAfter]: currentInstance && currentInstance.appliesTo < instance.appliesFrom,
    });

    const className = classNames(styles.instanceLine, {
        [styles.hasUnAssignedPerson]: instance.assignedPerson === null,
    });

    return (
        <div
            className={timelineInstanceClasses}
            style={{
                left: calculator(instance.appliesFrom.getTime()) + '%',
                right: 100 - calculator(instance.appliesTo.getTime()) + '%',
            }}
        >
            <div className={styles.dot} />
            <div
                className={className}
                ref={assignedPersonTooltipRef}
            />
            <div className={classNames(styles.dot, styles.right)} />
        </div>
    );
};

export default TimelineInstance;
