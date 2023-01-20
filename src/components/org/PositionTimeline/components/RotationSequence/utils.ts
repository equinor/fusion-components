import { RotationGroups } from '../../model';

export const getSortedRotationKeys = (rotationGroups: RotationGroups): string[] => {
    return Object.keys(rotationGroups).sort((a, b) => {
        if (isNaN(parseInt(a)) || isNaN(parseInt(b))) return a.localeCompare(b);
        return parseInt(a) - parseInt(b);
    });
};
