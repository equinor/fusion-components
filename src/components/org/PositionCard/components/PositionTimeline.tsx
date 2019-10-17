import React, { useMemo } from 'react';
import styles from '../styles.less';
import { PositionInstance } from '@equinor/fusion';
import { useTooltipRef } from '@equinor/fusion-components';
import classNames from 'classnames';

type PositionTimelineProps = {
    /** The instance that is currently active/shown */
    activeInstance: PositionInstance | null;
    /** All instances to the position */
    allInstances: PositionInstance[];
    /** Fist instance sorted by appliesFrom time */
    firstInstance: PositionInstance;
    /** Last instance sorted by appliesTo time */
    lastInstance: PositionInstance | undefined;
};

type TimelineInstanceProps = {
    /** Mapped instance from allInstances */
    instance: PositionInstance;
    /** The instance that is currently active/shown */
    activeInstance: PositionInstance | null;
    /** All instances to the position */
    allInstances: PositionInstance[];
    /** Position range calculator */
    calculator: (time: number) => number;
};

const createPositionCalculator = (start: number, end: number) => {
    const full = end - start;

    if (full <= 0) {
        throw new Error('No range');
    }

    return (time: number) => Math.floor(Math.min(Math.max(((time - start) / full) * 100, 0), 100));
};

const addDaysToDate = (date: Date, days: number): Date => {
    var result = new Date(date.valueOf());
    result.setDate(result.getDate() + days);
    return result;
};

const TimelineInstance: React.FC<TimelineInstanceProps> = ({
    instance,
    activeInstance,
    allInstances,
    calculator,
}) => {
    const assignedPersonName = instance.assignedPerson ? instance.assignedPerson.name : 'TBN';
    const assignedPersonTooltipRef = useTooltipRef(assignedPersonName, 'above');

    const timelineInstanceClasses = classNames(styles.instance, {
        [styles.isCurrent]: activeInstance && activeInstance.id === instance.id,
        [styles.isAfter]: activeInstance && activeInstance.appliesTo < instance.appliesFrom,
    });

    const className = classNames(styles.instanceLine, {
        [styles.hasUnAssignedPerson]: instance.assignedPerson === null,
    });

    const shouldRenderRightDot = useMemo(() => {
        const currentIndex = allInstances.findIndex(i => i.id === instance.id);
        if (currentIndex + 1 === allInstances.length) {
            return true;
        }
        if (activeInstance && activeInstance.id === instance.id) {
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
        if (!allInstances[currentIndex - 1] || !activeInstance) {
            return true;
        }
        if (activeInstance.id === allInstances[currentIndex - 1].id) {
            if (
                addDaysToDate(activeInstance.appliesTo, 3).valueOf() >
                instance.appliesFrom.valueOf()
            ) {
                return false;
            }
        }
        return true;
    }, [allInstances, instance, activeInstance]);

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

const PositionTimeline: React.FC<PositionTimelineProps> = ({
    activeInstance,
    allInstances,
    firstInstance,
    lastInstance,
}) => {
    const calculator = createPositionCalculator(
        firstInstance.appliesFrom.getTime(),
        (lastInstance || firstInstance).appliesTo.getTime()
    );
    return (
        <div className={styles.instanceTimelineContainer}>
            {allInstances.map(instanceByFrom => (
                <TimelineInstance
                    key={instanceByFrom.id}
                    instance={instanceByFrom}
                    activeInstance={activeInstance || null}
                    allInstances={allInstances}
                    calculator={calculator}
                />
            ))}
        </div>
    );
};

export default PositionTimeline;
