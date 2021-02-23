import WorkOrderType from '../models/WorkOrderType';
import {
    getWoStatus,
    getFollowUpStatus,
    proCoSysStatusPriorityMap,
    ProCoSysStatuses,
    FollowUpStatuses,
} from '../utils/procosys';
import {
    StatusFilterType,
    materialStatusMap,
    proCoSysStatusFilters,
    followUpStatusFilters,
    followUpStatusPriorityMap,
} from '../helpers';
import codes from '../models/Codes';
import { FilterTerm } from '../../../../../..';

export const getGroupByOption = (filter: FilterTerm[]): string => {
    const groupBy = filter.find((value) => value.key === 'group-by');
    const value = groupBy
        ? Array.isArray(groupBy.value)
            ? groupBy.value[0]
            : groupBy.value
        : 'hwp';
    return value || 'hwp';
};

export const getGroupBy = (filter: FilterTerm[]) => {
    const groupBy = getGroupByOption(filter);

    switch (groupBy) {
        case 'hwp':
            return 'plannedStartDate';

        case 'fwp':
            return 'plannedFinishDate';

        default:
            return groupBy;
    }
};

export const getStatus = (
    workOrder: WorkOrderType,
    filter?: FilterTerm[]
): ProCoSysStatuses | FollowUpStatuses => {
    if (filter && getGroupByOption(filter) === 'wp') {
        return getWoStatus(workOrder);
    }

    return getFollowUpStatus(workOrder);
};

export const getItemSearchableValues = (workOrder: WorkOrderType): WorkOrderType => {
    workOrder.searchableValues = [
        workOrder.workOrderNumber,
        workOrder.description,
        workOrder.responsible,
        workOrder.discipline,
        workOrder.milestone,
        workOrder.materialStatus,
        materialStatusMap[workOrder.materialStatus],
        workOrder.materialComments,
        workOrder.constructionComments,
        workOrder.projectProgress + '%',
        workOrder.estimatedHours + 'h',
        workOrder.remainingHours + 'h',
    ]
        .filter((value) => value)
        .map((value) => (value ? value.toLowerCase() : null))
        .join();
    return workOrder;
};

export const getFilterOptions = (
    key: string,
    codes: codes,
    filterTerms: FilterTerm[],
    defaultOptions?: StatusFilterType[]
): StatusFilterType[] | null => {
    switch (key) {
        case 'status':
            return getGroupByOption(filterTerms) === 'wp'
                ? proCoSysStatusFilters.filter((option) =>
                      codes.statuses.find((c) => c.key.indexOf(option.label))
                  )
                : followUpStatusFilters.filter((option) =>
                      codes.statuses.find((c) => c.key.indexOf(option.label))
                  );
        default:
            return defaultOptions || null;
    }
};

export const SortWorkOrdersByFilterTerms = (filter: FilterTerm[]) => (
    a: WorkOrderType,
    b: WorkOrderType
): number => {
    const aStatus = getStatus(a, filter);
    const bStatus = getStatus(b, filter);
    const groupBy = getGroupBy(filter);

    const sortBy = groupBy.indexOf('Date') > 0 ? groupBy : 'workOrderNumber';

    return (
        (followUpStatusPriorityMap[bStatus] || 0) - (followUpStatusPriorityMap[aStatus] || 0) ||
        (proCoSysStatusPriorityMap[bStatus] || 0) - (proCoSysStatusPriorityMap[aStatus] || 0) ||
        (a[sortBy] || '').localeCompare(b[sortBy] || '') ||
        a.workOrderNumber.localeCompare(b.workOrderNumber)
    );
};
