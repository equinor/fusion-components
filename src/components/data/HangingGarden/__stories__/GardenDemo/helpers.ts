import WorkOrderType from './models/WorkOrderType';

export type FollowUpStatuses =
    | 'WOFinished'
    | 'MaterialAndWoOk'
    | 'MaterialAndWoAvailable'
    | 'MaterialAndOrWoNotAvailable';

export const followUpStatuses: Record<FollowUpStatuses, string> = {
    WOFinished: 'WO Finished',
    MaterialAndWoOk: 'Material and WorkOrder OK',
    MaterialAndWoAvailable: 'Material and WorkOrder Available',
    MaterialAndOrWoNotAvailable: 'Material and/or WorkOrder not Available',
};

export const getFollowUpStatus = (workOrder: WorkOrderType): FollowUpStatuses => {
    const progress = parseInt(workOrder.projectProgress) || 0;

    if (progress === 100) return 'WOFinished';
    if (progress >= 50) return 'MaterialAndWoOk';
    if (progress > 0) return 'MaterialAndWoAvailable';

    return 'MaterialAndOrWoNotAvailable';
};

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
