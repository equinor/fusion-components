import { RotationGroups } from '../model';

export const getSortedRotationKeys = (rotationGroups: RotationGroups): string[] => {
    return Object.keys(rotationGroups).sort((a, b) => a.localeCompare(b));
};
