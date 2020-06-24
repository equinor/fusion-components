import WorkOrderType from '../models/WorkOrderType';

export const proCoSysStatuses: { [index: string]: string } = {
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

export const proCoSysWorkOrderColorMap: { [index: string]: string } = {
    [proCoSysStatuses.ASBuiltCompleted]: '#D6E5FF',
    [proCoSysStatuses.SentToPlanning]: '#003CA3',
    [proCoSysStatuses.MCDocsPrepared]: '#F0F04C',
    [proCoSysStatuses.ToField]: '#2FDA37',
    [proCoSysStatuses.FromField]: '#86EA8B',
    [proCoSysStatuses.ComplByMC]: '#0A64FF',
    [proCoSysStatuses.Cancelled]: '#F4937B',
    [proCoSysStatuses.SentDC]: '#70A5FF',
    [proCoSysStatuses.ToMC]: '#F1BEB1',
    [proCoSysStatuses.Prepared]: '#B8B8B8',
    [proCoSysStatuses.NoStatus]: '#EC3E13',
};

export const followUpStatuses: { [index: string]: string } = {
    WOFinished: 'WO Finished',
    MaterialAndWoOk: 'Material and WorkOrder OK',
    MaterialAndWoAvailable: 'Material and WorkOrder Available',
    MaterialAndOrWoNotAvailable: 'Material and/or WorkOrder not Available',
};

export const proCoSysStatusPriorityMap: { [index: string]: number } = {
    [proCoSysStatuses.ASBuiltCompleted]: 0,
    [proCoSysStatuses.SentToPlanning]: 1,
    [proCoSysStatuses.SentDC]: 2,
    [proCoSysStatuses.ComplByMC]: 3,
    [proCoSysStatuses.FromField]: 4,
    [proCoSysStatuses.ToField]: 5,
    [proCoSysStatuses.MCDocsPrepared]: 6,
    [proCoSysStatuses.ToMC]: 7,
    [proCoSysStatuses.Cancelled]: 8,
    [proCoSysStatuses.Prepared]: 9,
    [proCoSysStatuses.NoStatus]: 10,
};

export const getWoStatusFromDates = (workOrder: WorkOrderType): string => {
    if (workOrder.w10ActualDate) {
        return proCoSysStatuses.SentToPlanning;
    } else if (workOrder.w9ActualDate) {
        return proCoSysStatuses.ASBuiltCompleted;
    } else if (workOrder.w8ActualDate) {
        return proCoSysStatuses.SentDC;
    } else if (workOrder.w7ActualDate) {
        return proCoSysStatuses.Cancelled;
    } else if (workOrder.w6ActualDate) {
        return proCoSysStatuses.ComplByMC;
    } else if (workOrder.w5ActualDate) {
        return proCoSysStatuses.FromField;
    } else if (workOrder.w4ActualDate) {
        return proCoSysStatuses.ToField;
    } else if (workOrder.w3ActualDate) {
        return proCoSysStatuses.MCDocsPrepared;
    } else if (workOrder.w2ActualDate) {
        return proCoSysStatuses.ToMC;
    } else if (workOrder.w1ActualDate) {
        return proCoSysStatuses.Prepared;
    }

    return proCoSysStatuses.NoStatus;
};

export const getWoStatus = (workOrder: WorkOrderType): string => {
    switch (workOrder.jobStatus) {
        case 'W01':
            return proCoSysStatuses.Prepared;

        case 'W02':
            return proCoSysStatuses.ToMC;

        case 'W03':
            return proCoSysStatuses.MCDocsPrepared;

        case 'W04':
            return proCoSysStatuses.ToField;

        case 'W05':
            return proCoSysStatuses.FromField;

        case 'W06':
            return proCoSysStatuses.ComplByMC;

        case 'W07':
            return proCoSysStatuses.Cancelled;

        case 'W08':
            return proCoSysStatuses.SentDC;

        case 'W09':
            return proCoSysStatuses.ASBuiltCompleted;

        case 'W10':
            return proCoSysStatuses.SentToPlanning;
    }

    return getWoStatusFromDates(workOrder);
};

export const proCoSysWorkOrderColorMapHex: { [hex: string]: number } = {
    [proCoSysStatuses.ASBuiltCompleted]: 0xd6e5ff,
    [proCoSysStatuses.SentToPlanning]: 0x003ca3,
    [proCoSysStatuses.MCDocsPrepared]: 0xf0f04c,
    [proCoSysStatuses.ToField]: 0x2fda37,
    [proCoSysStatuses.FromField]: 0x86ea8b,
    [proCoSysStatuses.ComplByMC]: 0x0a64ff,
    [proCoSysStatuses.Cancelled]: 0xf4937b,
    [proCoSysStatuses.SentDC]: 0x70a5ff,
    [proCoSysStatuses.ToMC]: 0xf1beb1,
    [proCoSysStatuses.Prepared]: 0xb8b8b8,
    [proCoSysStatuses.NoStatus]: 0xec3e13,
};

export const proCoSysWorkOrderProgressColorMap: { [hex: string]: number } = {
    [proCoSysStatuses.ASBuiltCompleted]: 0x99beff,
    [proCoSysStatuses.SentToPlanning]: 0x001c4d,
    [proCoSysStatuses.MCDocsPrepared]: 0xecec13,
    [proCoSysStatuses.ToField]: 0x22c32a,
    [proCoSysStatuses.FromField]: 0x52e059,
    [proCoSysStatuses.ComplByMC]: 0x004bcc,
    [proCoSysStatuses.Cancelled]: 0xf06542,
    [proCoSysStatuses.SentDC]: 0x337eff,
    [proCoSysStatuses.ToMC]: 0xe8927d,
    [proCoSysStatuses.Prepared]: 0x999999,
    [proCoSysStatuses.NoStatus]: 0xbd320f,
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

export const orderedProCoSysStatuses: string[] = [
    proCoSysStatuses.NoStatus,
    proCoSysStatuses.Prepared,
    proCoSysStatuses.ToMC,
    proCoSysStatuses.MCDocsPrepared,
    proCoSysStatuses.ToField,
    proCoSysStatuses.FromField,
    proCoSysStatuses.ComplByMC,
    proCoSysStatuses.Cancelled,
    proCoSysStatuses.SentDC,
    proCoSysStatuses.ASBuiltCompleted,
    proCoSysStatuses.SentToPlanning,
];

export const materialOk = (workOrder: WorkOrderType) =>
    woHasMaterialStatus(workOrder, 'm12', 'm13', 'mn');
export const materialAvailable = (workOrder: WorkOrderType) =>
    woHasMaterialStatus(workOrder, 'm7', 'm9', 'm10', 'm11', 'mn');
export const materialNotAvailable = (workOrder: WorkOrderType) =>
    !workOrder.materialStatus || woHasMaterialStatus(workOrder, 'NS', 'm2', 'm3', 'm4', 'm5', 'm6');
export const getFollowUpStatus = (workOrder: WorkOrderType) => {
    const status = getWoStatus(workOrder);
    const statusIndex = orderedProCoSysStatuses.indexOf(status);

    if (workOrder.projectProgress.toString() === '100') {
        return followUpStatuses.WOFinished;
    } else if (materialOk(workOrder) && [4, 5, 6, 7, 8, 9, 10].indexOf(statusIndex) > -1) {
        return followUpStatuses.MaterialAndWoOk;
    } else if (
        materialAvailable(workOrder) &&
        [3, 4, 5, 6, 7, 8, 9, 10].indexOf(statusIndex) > -1
    ) {
        return followUpStatuses.MaterialAndWoAvailable;
    }

    return followUpStatuses.MaterialAndOrWoNotAvailable;
};

const getHandoverWorkOrderStatusIndex = (workOrder: WorkOrderType) => {
    return parseInt(workOrder.workOrderStatus.replace(/([^0-9]+)/, ''));
};

export const getHandoverWorkOrderStatus = (workOrder: WorkOrderType) => {
    const statusIndex = getHandoverWorkOrderStatusIndex(workOrder);

    if (workOrder.projectProgress.toString() === '100') {
        return followUpStatuses.WOFinished;
    } else if (materialOk(workOrder) && [3, 4, 5, 6, 8, 9, 10].indexOf(statusIndex) > -1) {
        return followUpStatuses.MaterialAndWoOk;
    } else if (materialAvailable(workOrder) && [3, 4, 5, 6, 8, 9, 10].indexOf(statusIndex) > -1) {
        return followUpStatuses.MaterialAndWoAvailable;
    }

    return followUpStatuses.MaterialAndOrWoNotAvailable;
};
