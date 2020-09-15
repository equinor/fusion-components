import {
    followUpStatuses,
    proCoSysStatuses,
    proCoSysWorkOrderColorMap,
} from '../WorkOrderGarden/utils/procosys';
import WorkOrderType from './models/WorkOrderType';
import { FilterTypes } from '../../../../..';

export const followUpColorMapHex: Record<string, number> = {
    [followUpStatuses.WOFinished]: 0x1273dd,
    [followUpStatuses.MaterialAndWoOk]: 0x4bb748,
    [followUpStatuses.MaterialAndWoAvailable]: 0xfbca36,
    [followUpStatuses.MaterialAndOrWoNotAvailable]: 0xff3b3b,
};

export const followUpColorMap: Record<string, string> = {
    [followUpStatuses.WOFinished]: '#1273DD',
    [followUpStatuses.MaterialAndWoOk]: '#4BB748',
    [followUpStatuses.MaterialAndWoAvailable]: '#FBCA36',
    [followUpStatuses.MaterialAndOrWoNotAvailable]: '#FF3B3B',
};

export const followUpProgressColorMap: Record<string, number> = {
    [followUpStatuses.WOFinished]: 0x004bcc,
    [followUpStatuses.MaterialAndWoOk]: 0x26d92f,
    [followUpStatuses.MaterialAndWoAvailable]: 0xffe212,
    [followUpStatuses.MaterialAndOrWoNotAvailable]: 0xf06d4c,
};

export const followUpStatusPriorityMap: Record<string, number> = {
    [followUpStatuses.MaterialAndOrWoNotAvailable]: 3,
    [followUpStatuses.MaterialAndWoAvailable]: 2,
    [followUpStatuses.MaterialAndWoOk]: 1,
    [followUpStatuses.WOFinished]: 0,
};

export const materialStatusMap: Record<string, string> = {
    M10: 'Material requested to job site',
    M12: 'Material received on job site',
    M2: 'Materials linked to Smartpack/Jobcard',
    M6: 'Material partly delivered',
    M7: 'Materials fully delivered',
    M9: 'Material returned',
    MN: 'No Material required',
    MN1: 'Additional material to be issued Offshore from Min/Max Stock',
    MNX1: 'Materials not linked to Smartpack/Jobcard',
    MNX2: 'Materials partially linked to Smartpack/Jobcard',
};

export const addIfNotExist = (
    list: { key: string; label: string }[],
    key: string | null,
    label?: string
): void => {
    if (key && !list.find((c) => c.key === key)) {
        list.push(createCheckBoxOption(key, label));
    }
};

type columnSorterKey = {
    key: string;
};
export const columnSorter = ({ key: a }: columnSorterKey, { key: b }: columnSorterKey) => {
    if (a === null) {
        return -1;
    } else if (b === null) {
        return 1;
    }

    const aNumber = parseInt(a, 10);
    const bNumber = parseInt(b, 10);
    if (a.endsWith('%') && b.endsWith('%') && !Number.isNaN(aNumber) && !Number.isNaN(bNumber)) {
        return aNumber - bNumber;
    }

    return a.localeCompare(b);
};

export type StatusFilterType = {
    key: string;
    label: string;
    color?: string | number;
};
export const followUpStatusFilters: StatusFilterType[] = [
    {
        key: followUpStatuses.MaterialAndOrWoNotAvailable,
        label: followUpStatuses.MaterialAndOrWoNotAvailable,
        color: followUpColorMap[followUpStatuses.MaterialAndOrWoNotAvailable],
    },
    {
        key: followUpStatuses.MaterialAndWoAvailable,
        label: followUpStatuses.MaterialAndWoAvailable,
        color: followUpColorMap[followUpStatuses.MaterialAndWoAvailable],
    },
    {
        key: followUpStatuses.MaterialAndWoOk,
        label: followUpStatuses.MaterialAndWoOk,
        color: followUpColorMap[followUpStatuses.MaterialAndWoOk],
    },
    {
        key: followUpStatuses.WOFinished,
        label: followUpStatuses.WOFinished,
        color: followUpColorMap[followUpStatuses.WOFinished],
    },
];

export const proCoSysStatusFilters = Object.keys(proCoSysStatuses).map(
    (key) =>
        <StatusFilterType>{
            key: proCoSysStatuses[key],
            label: proCoSysStatuses[key],
            color: proCoSysWorkOrderColorMap[proCoSysStatuses[key]],
        }
);

export const MAT_STATUS_MAP: { [index: string]: string } = {
    MN: 'OK',
    M10: 'OK',
    M11: 'OK',
    M12: 'OK',
    M5: 'AVAILABLE',
    M6: 'AVAILABLE',
    M7: 'AVAILABLE',
    M9: 'AVAILABLE',
    M2: 'NOT_AVAILABLE',
    M3: 'NOT_AVAILABLE',
    M4: 'NOT_AVAILABLE',
};

export const MAT_STATUS_COLORS: Record<string, number> = {
    OK: 0x00ff00,
    AVAILABLE: 0xffff00,
    NOT_AVAILABLE: 0xff0000,
};

export const getMatStatusColor = (workOrder: WorkOrderType) => {
    const materialStatus = MAT_STATUS_MAP[workOrder.materialStatus];
    return MAT_STATUS_COLORS[materialStatus] || 0xafafaf;
};

export const mccrColorMap: Record<string, number> = {
    OS: 0xafafaf,
    PB: 0xffff00,
    PA: 0xf04c90,
    OK: 0x00ff00,
};

export const getMccrStatusColor = (workOrder: WorkOrderType): number => {
    const status = workOrder.mccrStatus;
    if (!status) {
        return mccrColorMap.OK;
    }

    if (status === 'OS') {
        return 0xafafaf;
    }

    return mccrColorMap[status];
};

export const createCheckBoxesFilter = (key: string, label: string) => ({
    key: key,
    title: label,
    isCollapsible: true,
    isCollapsed: true,
    isVisibleWhenPaneIsCollapsed: true,
    type: FilterTypes.Checkbox,
    getValue: (item: WorkOrderType) => item[key],
    options: [], // Options populated when data is fetched
});

const BLANK_FILTER_LABEL = '[Blank]';
export const createCheckBoxOption = (key: string, label?: string) => ({
    key: key,
    label: label || key || BLANK_FILTER_LABEL,
});

export const optionSorter = (a: string, b: string) => {
    if (a === null) {
        return -1;
    } else if (b === null) {
        return 1;
    }

    const aNumber = parseInt(a, 10);
    const bNumber = parseInt(b, 10);
    if (a.endsWith('%') && b.endsWith('%') && !Number.isNaN(aNumber) && !Number.isNaN(bNumber)) {
        return aNumber - bNumber;
    }

    return a.localeCompare(b);
};
