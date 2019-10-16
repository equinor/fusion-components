import React, { useMemo } from 'react';
import styles from '../styles.less';
import { PositionInstance } from '@equinor/fusion';
import { useTooltipRef } from '@equinor/fusion-components';
import classNames from 'classnames';

type TimelineInstanceProps = {
    instance: PositionInstance;
    currentInstance: PositionInstance | null;
    calculator: (time: number) => number;
    allInstances: PositionInstance[];
};

const addDaysToDate = (date: Date, days: number): Date => {
    var result = new Date(date.valueOf());
    result.setDate(result.getDate() + days);
    return result;
};

const TimelineInstance: React.FC<TimelineInstanceProps> = ({
    instance,
    currentInstance,
    calculator,
    allInstances,
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

    const shouldRenderRightDot = useMemo(() => {
        const currentIndex = allInstances.findIndex(i => i.id === instance.id);
        if (currentIndex + 1 === allInstances.length) {
            return true;
        }
        if (currentInstance && currentInstance.id === instance.id) {
            return true;
        }
        if (
            allInstances[currentIndex + 1] &&
            allInstances[currentIndex + 1].appliesFrom.valueOf() >
                addDaysToDate(instance.appliesTo, 3).valueOf()
        ) {
            return true;
        }
        return false;
    }, [allInstances, instance]);

    const shouldRenderLeftDot = useMemo(() => {
        const currentIndex = allInstances.findIndex(i => i.id === instance.id);
        if (!allInstances[currentIndex - 1] || !currentInstance) {
            return true;
        }
        if (currentInstance.id === allInstances[currentIndex - 1].id) {
            if (
                addDaysToDate(currentInstance.appliesTo, 3).valueOf() >
                instance.appliesFrom.valueOf()
            ) {
                return false;
            }
        }
        return true;
    }, [allInstances, instance, currentInstance]);

    return (
        <div
            className={timelineInstanceClasses}
            style={{
                left: calculator(instance.appliesFrom.getTime()) + '%',
                right: 100 - calculator(instance.appliesTo.getTime()) + '%',
            }}
        >
            {shouldRenderLeftDot && <div className={styles.dot} />}
            <div className={className} ref={assignedPersonTooltipRef} />
            {shouldRenderRightDot && <div className={classNames(styles.dot, styles.right)} />}
        </div>
    );
};

export default TimelineInstance;
