import { PositionInstance } from '@equinor/fusion';

export const isInstanceCurrent = (instance: PositionInstance) => {
    const now = Date.now();
    return now >= instance.appliesFrom.getTime() && now <= instance.appliesTo.getTime();
};

export const sortInstancesByFrom = (instances: PositionInstance[]) =>
    [...instances].sort((a, b) => a.appliesFrom.getTime() - b.appliesFrom.getTime());

export const sortInstancesByTo = (instances: PositionInstance[]) =>
    [...instances].sort((a, b) => b.appliesTo.getTime() - a.appliesTo.getTime());

export const hasNameMatchInQuery = (instance: PositionInstance | undefined, query: string) =>
    instance?.assignedPerson?.name?.toLowerCase().includes(query);
