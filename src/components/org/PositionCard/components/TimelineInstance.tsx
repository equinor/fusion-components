import React from 'react';
import styles from '../styles.less';
import { PositionInstance } from '@equinor/fusion';
import { useTooltipRef } from '@equinor/fusion-components';
import classNames from 'classnames';

type TimelineInstanceProps = {
    instance: PositionInstance;
    calculator: (time: number) => number;
};
const TimelineInstance: React.FC<TimelineInstanceProps> = ({ instance, calculator }) => {
    const assignedPersonName = instance.assignedPerson ? instance.assignedPerson.name : 'TBN';
    const assignedPersonTooltipRef = useTooltipRef(assignedPersonName, 'above');

    const className = classNames(styles.instance, {
        [styles.hasAssignedPerson]: instance.assignedPerson !== null,
    });

    return (
        <>
            <div
                className={className}
                ref={assignedPersonTooltipRef}
                style={{
                    left: calculator(instance.appliesFrom.getTime()) + '%',
                    right: 100 - calculator(instance.appliesTo.getTime()) + '%',
                }}
            />
            <div className={styles.dot} />
        </>
    );
};

export default TimelineInstance;
