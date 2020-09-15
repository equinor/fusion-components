import {
    followUpStatuses,
    proCoSysStatuses,
    proCoSysWorkOrderColorMap,
    FollowUpStatuses,
} from '../WorkOrderGarden/utils/procosys';
import WorkOrderType from './models/WorkOrderType';
import { FilterTypes } from '../../../../..';

export const followUpColorMapHex: Record<FollowUpStatuses, number> = {
    WOFinished: 0x1273dd,
    MaterialAndWoOk: 0x4bb748,
    MaterialAndWoAvailable: 0xfbca36,
    MaterialAndOrWoNotAvailable: 0xff3b3b,
};

export const followUpColorMap: Record<FollowUpStatuses, string> = {
    WOFinished: '#1273DD',
    MaterialAndWoOk: '#4BB748',
    MaterialAndWoAvailable: '#FBCA36',
    MaterialAndOrWoNotAvailable: '#FF3B3B',
};

export const followUpProgressColorMap: Record<FollowUpStatuses, number> = {
    WOFinished: 0x004bcc,
    MaterialAndWoOk: 0x26d92f,
    MaterialAndWoAvailable: 0xffe212,
    MaterialAndOrWoNotAvailable: 0xf06d4c,
};

export const followUpStatusPriorityMap: Record<FollowUpStatuses, number> = {
    MaterialAndOrWoNotAvailable: 3,
    MaterialAndWoAvailable: 2,
    MaterialAndWoOk: 1,
    WOFinished: 0,
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
    key: FollowUpStatuses;
    label: string;
    color?: string | number;
};
export const followUpStatusFilters: StatusFilterType[] = [
    {
        key: 'MaterialAndOrWoNotAvailable',
        label: followUpStatuses.MaterialAndOrWoNotAvailable,
        color: followUpColorMap.MaterialAndOrWoNotAvailable,
    },
    {
        key: 'MaterialAndWoAvailable',
        label: followUpStatuses.MaterialAndWoAvailable,
        color: followUpColorMap.MaterialAndWoAvailable,
    },
    {
        key: 'MaterialAndWoOk',
        label: followUpStatuses.MaterialAndWoOk,
        color: followUpColorMap.MaterialAndWoOk,
    },
    {
        key: 'WOFinished',
        label: followUpStatuses.WOFinished,
        color: followUpColorMap.WOFinished,
    },
];

export const proCoSysStatusFilters = Object.keys(proCoSysStatuses).map(
    (key) =>
        <StatusFilterType>{
            key: proCoSysStatuses[key],
            label: proCoSysStatuses[key],
            color: proCoSysWorkOrderColorMap[key],
        }
);

export const MAT_STATUS_MAP: Record<string, string> = {
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
