import { PositionInstance } from '@equinor/fusion';
import { isAfter, isBefore } from 'date-fns';
import { useMemo } from 'react';

export default (
    instances: PositionInstance[] = [],
    allowFuture: boolean,
    allowPast: boolean
): { instance: PositionInstance } => {
    const now = Date.now();
    const activeInstance = instances.find(
        (i) => now >= i.appliesFrom.getTime() && now <= i.appliesTo.getTime()
    );

    /**
     * Returns current active position instance if it exists. If not,
     * the following conditions will be evaluated (in this order):
     * - allowFuture is true; the closest future instance is returned
     * - allowPast is true; the closest past instance is returned
     */
    const instance = useMemo(() => {
        if (activeInstance) return activeInstance;

        const instancesSortedByFrom = [...instances].sort(
            (a, b) => a.appliesFrom.getTime() - b.appliesFrom.getTime()
        );
        const futureInstance = instancesSortedByFrom.filter((x) => isAfter(x.appliesFrom, now))[0];

        const instancesSortedByTo = [...instances].sort(
            (a, b) => b.appliesTo.getTime() - a.appliesTo.getTime()
        );
        const pastInstance = instancesSortedByTo.filter((x) => isBefore(x.appliesTo, now))[0];

        if (allowFuture && futureInstance) return futureInstance;
        if (allowPast && pastInstance) return pastInstance;
    }, [instances, activeInstance]);

    return { instance };
};
