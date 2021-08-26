import { PositionInstance } from '@equinor/fusion';
import { isAfter, isBefore } from 'date-fns';
import { useMemo } from 'react';
import { isInstanceCurrent, sortInstancesByFrom, sortInstancesByTo } from '../utils';

const usePositionInstance = (
    instances: PositionInstance[] = [],
    allowFuture: boolean,
    allowPast: boolean
): { instance: PositionInstance } => {
    const now = Date.now();
    const activeInstance = useMemo(() => instances.find(isInstanceCurrent), [instances]);

    /**
     * Returns current active position instance if it exists. If not,
     * the following conditions will be evaluated (in this order):
     * - allowFuture is true; the closest future instance is returned
     * - allowPast is true; the closest past instance is returned
     */
    const instance = useMemo(() => {
        if (activeInstance) return activeInstance;

        const instancesSortedByFrom = sortInstancesByFrom(instances);
        const futureInstance = instancesSortedByFrom.filter((x) => isAfter(x.appliesFrom, now))[0];

        const instancesSortedByTo = sortInstancesByTo(instances);
        const pastInstance = instancesSortedByTo.filter((x) => isBefore(x.appliesTo, now))[0];

        if (allowFuture && futureInstance) return futureInstance;
        if (allowPast && pastInstance) return pastInstance;
    }, [instances, activeInstance, allowFuture, allowPast]);

    return { instance };
};

export default usePositionInstance;
