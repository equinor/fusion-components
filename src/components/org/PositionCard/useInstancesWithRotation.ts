import { useMemo } from 'react';
import { PositionInstance } from '@equinor/fusion';

export type PositionInstanceRotation = PositionInstance & {
    rotatingInstances?: PositionInstance[];
};

export default (allInstances: PositionInstance[]) =>
    useMemo(
        () =>
            allInstances
                .reduce((instances: PositionInstanceRotation[], instance: PositionInstance) => {
                    const correlatingInstances = allInstances.filter(
                        i =>
                            instance.appliesFrom.getTime() <= i.appliesTo.getTime() &&
                            i.type === 'Rotation' &&
                            instance.type === 'Rotation' &&
                            instance.id !== i.id
                    );
                    if (correlatingInstances.length > 0) {
                        const uniqueTimeInstances = !instances.some(
                            i => instance.appliesFrom.getTime() === i.appliesFrom.getTime()
                        );

                        const shortestInstance = [instance, ...correlatingInstances].sort(
                            (a, b) => a.appliesTo.getTime() - b.appliesTo.getTime()
                        );
                        const isShortestInstance = shortestInstance[0].id === instance.id;

                        if (uniqueTimeInstances && isShortestInstance) {
                            return [
                                ...instances,
                                {
                                    ...instance,
                                    rotatingInstances: correlatingInstances,
                                },
                            ];
                        }
                        return instances;
                    }

                    return [...instances, instance];
                }, [])
                .sort((a, b) => a.appliesFrom.getTime() - b.appliesFrom.getTime()),
        [allInstances]
    );
