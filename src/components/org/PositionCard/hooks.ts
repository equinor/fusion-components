import { useMemo } from 'react';
import { PositionInstance } from '@equinor/fusion';

export type PositionInstanceRotation = PositionInstance & {
    rotatingInstances?: PositionInstance[];
};

export const useInstancesWithRotation = (allInstances: PositionInstance[]): PositionInstanceRotation[] =>
    useMemo(
        () =>
            allInstances
                .reduce((instances: PositionInstanceRotation[], instance: PositionInstance) => {
                    const correlatingInstances = allInstances.filter(
                        i =>
                            i.appliesFrom.getTime() <= instance.appliesTo.getTime() &&
                            i.appliesTo.getTime() >= instance.appliesFrom.getTime() &&
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

export const useCurrentInstance = (
    allInstances: PositionInstance[],
    activeInstance: PositionInstance | undefined,
    selectedDate: Date | undefined
) => {
    const instancesWithRotation = useInstancesWithRotation(allInstances);
    const currentInstance =
        (activeInstance &&
            instancesWithRotation.find(
                i =>
                    i.id === activeInstance.id ||
                    (i.rotatingInstances &&
                        i.rotatingInstances.some(rotation => rotation.id === activeInstance.id) &&
                        (selectedDate
                            ? selectedDate.getTime() >= i.appliesFrom.getTime() &&
                              selectedDate.getTime() <= i.appliesTo.getTime()
                            : true)) ||
                    false
            )) ||
        null;

    return currentInstance;
};
