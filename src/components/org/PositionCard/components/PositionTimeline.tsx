import React, { useMemo, useCallback } from 'react';
import styles from '../styles.less';
import { PositionInstance, formatDate } from '@equinor/fusion';
import { useTooltipRef } from '@equinor/fusion-components';
import classNames from 'classnames';
import useInstancesWithRotation, { PositionInstanceRotation } from '../useInstancesWithRotation';

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
    instance: PositionInstanceRotation;
    /** The instance that is currently active/shown */
    activeInstance: PositionInstanceRotation | null;
    /** All instances to the position */
    allInstances: PositionInstanceRotation[];
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
    const getName = useCallback(
        (instance: PositionInstanceRotation) =>
            instance.assignedPerson ? instance.assignedPerson.name : 'TBN',
        []
    );
    const rotationInstances = instance.rotatingInstances || [];
    const assignedPersons = [instance, ...rotationInstances];

    const assignedPersonTooltipRef = useTooltipRef(
        assignedPersons.map(i => (
            <>
                <span>
                    {getName(i)}
                    <br /> {formatDate(i.appliesFrom)} - {formatDate(i.appliesTo)} ({i.workload}%)
                </span>
                <br />
            </>
        )),
        'below'
    );

    const timelineInstanceClasses = classNames(styles.instance, {
        [styles.isCurrent]: activeInstance && activeInstance.id === instance.id,
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
            ref={assignedPersonTooltipRef}
            style={{
                left: calculator(instance.appliesFrom.getTime()) + '%',
                right: 100 - calculator(instance.appliesTo.getTime()) + '%',
            }}
        >
            {shouldRenderLeftDot && <div className={styles.dot} />}
            <div className={styles.instanceLine} />
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
    const allInstancesWithRotation = useInstancesWithRotation(allInstances);

    const active =
        (activeInstance &&
            allInstancesWithRotation.find(
                i =>
                    i.id === activeInstance.id ||
                    (i.rotatingInstances &&
                        i.rotatingInstances.some(rotation => rotation.id === activeInstance.id)) ||
                    false
            )) ||
        null;

    return (
        <div className={styles.instanceTimelineContainer}>
            {allInstancesWithRotation.map(instanceByFrom => (
                <TimelineInstance
                    key={instanceByFrom.id}
                    instance={instanceByFrom}
                    activeInstance={active}
                    allInstances={allInstancesWithRotation}
                    calculator={calculator}
                />
            ))}
        </div>
    );
};

export default PositionTimeline;
