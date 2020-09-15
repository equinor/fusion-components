import WorkOrderType from '../models/WorkOrderType';

export type ProCoSysStatuses =
    | 'NoStatus'
    | 'Prepared'
    | 'Cancelled'
    | 'ToMC'
    | 'MCDocsPrepared'
    | 'ToField'
    | 'FromField'
    | 'ComplByMC'
    | 'SentDC'
    | 'SentToPlanning'
    | 'ASBuiltCompleted';

export type FollowUpStatuses =
    | 'WOFinished'
    | 'MaterialAndWoOk'
    | 'MaterialAndWoAvailable'
    | 'MaterialAndOrWoNotAvailable';

export const proCoSysStatuses: Record<ProCoSysStatuses, string> = {
    NoStatus: 'No status',
    Prepared: 'WO Prepared',
    Cancelled: 'WO Cancelled',
    ToMC: 'WO to MC',
    MCDocsPrepared: "MC doc's prepared",
    ToField: 'WO to Field',
    FromField: 'WO from Field',
    ComplByMC: 'WO compl. By MC',
    SentDC: 'WO Sent DC',
    SentToPlanning: 'WO Sent to planning',
    ASBuiltCompleted: 'AS Built completed',
};

export const proCoSysWorkOrderColorMap: Record<ProCoSysStatuses, string> = {
    ASBuiltCompleted: '#D6E5FF',
    SentToPlanning: '#003CA3',
    MCDocsPrepared: '#F0F04C',
    ToField: '#2FDA37',
    FromField: '#86EA8B',
    ComplByMC: '#0A64FF',
    Cancelled: '#F4937B',
    SentDC: '#70A5FF',
    ToMC: '#F1BEB1',
    Prepared: '#B8B8B8',
    NoStatus: '#EC3E13',
};

export const followUpStatuses: Record<FollowUpStatuses, string> = {
    WOFinished: 'WO Finished',
    MaterialAndWoOk: 'Material and WorkOrder OK',
    MaterialAndWoAvailable: 'Material and WorkOrder Available',
    MaterialAndOrWoNotAvailable: 'Material and/or WorkOrder not Available',
};

export const proCoSysStatusPriorityMap: Record<ProCoSysStatuses, number> = {
    ASBuiltCompleted: 0,
    SentToPlanning: 1,
    SentDC: 2,
    ComplByMC: 3,
    FromField: 4,
    ToField: 5,
    MCDocsPrepared: 6,
    ToMC: 7,
    Cancelled: 8,
    Prepared: 9,
    NoStatus: 10,
};

export const getWoStatusFromDates = (workOrder: WorkOrderType): ProCoSysStatuses => {
    if (workOrder.w10ActualDate) {
        return 'SentToPlanning';
    } else if (workOrder.w9ActualDate) {
        return 'ASBuiltCompleted';
    } else if (workOrder.w8ActualDate) {
        return 'SentDC';
    } else if (workOrder.w7ActualDate) {
        return 'Cancelled';
    } else if (workOrder.w6ActualDate) {
        return 'ComplByMC';
    } else if (workOrder.w5ActualDate) {
        return 'FromField';
    } else if (workOrder.w4ActualDate) {
        return 'ToField';
    } else if (workOrder.w3ActualDate) {
        return 'MCDocsPrepared';
    } else if (workOrder.w2ActualDate) {
        return 'ToMC';
    } else if (workOrder.w1ActualDate) {
        return 'Prepared';
    }

    return 'NoStatus';
};

export const getWoStatus = (workOrder: WorkOrderType): ProCoSysStatuses => {
    switch (workOrder.jobStatus) {
        case 'W01':
            return 'Prepared';

        case 'W02':
            return 'ToMC';

        case 'W03':
            return 'MCDocsPrepared';

        case 'W04':
            return 'ToField';

        case 'W05':
            return 'FromField';

        case 'W06':
            return 'ComplByMC';

        case 'W07':
            return 'Cancelled';

        case 'W08':
            return 'SentDC';

        case 'W09':
            return 'ASBuiltCompleted';

        case 'W10':
            return 'SentToPlanning';
    }

    return getWoStatusFromDates(workOrder);
};

export const proCoSysWorkOrderColorMapHex: Record<ProCoSysStatuses, number> = {
    ASBuiltCompleted: 0xd6e5ff,
    SentToPlanning: 0x003ca3,
    MCDocsPrepared: 0xf0f04c,
    ToField: 0x2fda37,
    FromField: 0x86ea8b,
    ComplByMC: 0x0a64ff,
    Cancelled: 0xf4937b,
    SentDC: 0x70a5ff,
    ToMC: 0xf1beb1,
    Prepared: 0xb8b8b8,
    NoStatus: 0xec3e13,
};

export const proCoSysWorkOrderProgressColorMap: Record<ProCoSysStatuses, number> = {
    ASBuiltCompleted: 0x99beff,
    SentToPlanning: 0x001c4d,
    MCDocsPrepared: 0xecec13,
    ToField: 0x22c32a,
    FromField: 0x52e059,
    ComplByMC: 0x004bcc,
    Cancelled: 0xf06542,
    SentDC: 0x337eff,
    ToMC: 0xe8927d,
    Prepared: 0x999999,
    NoStatus: 0xbd320f,
};

const prepareMaterialStatus = (status: string): string[] => {
    status = status.toLowerCase();

    let number = status.replace(/[^0-9]+/, '');
    if (number.length === 1) {
        number = '0' + number;
    }

    if (!number.length) {
        return [status];
    }

    return [status, 'm' + number];
};

const woHasMaterialStatus = (workOrder: WorkOrderType, ...statuses: string[]) => {
    const materialStatuses = statuses
        .map((status) => prepareMaterialStatus(status))
        .reduce((all, current) => all.concat(current), []);
    const woMaterialStatus = workOrder.materialStatus.toLowerCase();
    return materialStatuses.filter(
        (materialStatus) => woMaterialStatus.indexOf(materialStatus) === 0
    ).length;
};

export const materialOk = (workOrder: WorkOrderType) =>
    woHasMaterialStatus(workOrder, 'm12', 'm13', 'mn');

export const materialAvailable = (workOrder: WorkOrderType) =>
    woHasMaterialStatus(workOrder, 'm7', 'm9', 'm10', 'm11', 'mn');

export const materialNotAvailable = (workOrder: WorkOrderType) =>
    !workOrder.materialStatus || woHasMaterialStatus(workOrder, 'NS', 'm2', 'm3', 'm4', 'm5', 'm6');

export const workOrderOk = (workOrder: WorkOrderType) =>
    Boolean(
        getWoStatus(workOrder) ===
            ('ToField' ||
                'FromField' ||
                'ComplByMC' ||
                'Cancelled' ||
                'SentDC' ||
                'ASBuiltCompleted' ||
                'SentToPlanning')
    );

export const workOrderAvailable = (workOrder: WorkOrderType) =>
    Boolean(
        getWoStatus(workOrder) ===
            ('MCDocsPrepared' ||
                'ToField' ||
                'FromField' ||
                'ComplByMC' ||
                'Cancelled' ||
                'SentDC' ||
                'ASBuiltCompleted' ||
                'SentToPlanning')
    );

export const getFollowUpStatus = (workOrder: WorkOrderType) => {
    if (workOrder.projectProgress.toString() === '100') return followUpStatuses.WOFinished;

    if (materialOk(workOrder) && workOrderOk(workOrder)) return followUpStatuses.MaterialAndWoOk;

    if (materialAvailable(workOrder) && workOrderAvailable(workOrder))
        return followUpStatuses.MaterialAndWoAvailable;

    return followUpStatuses.MaterialAndOrWoNotAvailable;
};
