import * as React from 'react';

import WorkOrderType from '../models/WorkOrderType';
import {
    addIfNotExist,
    optionSorter,
    proCoSysStatusFilters,
    followUpStatusFilters,
} from '../helpers';
import {
    getStatus,
    getFilterOptions,
    getGroupByOption,
    SortWorkOrdersByFilterTerms,
} from './filter';
import Codes from '../models/Codes';
import { StatusFilterType } from '../helpers';
import {
    FilterTerm,
    FilterSection,
    FilterPane,
    useTooltipRef,
    IconButton,
    SyncIcon,
} from '../../../../../..';

type WorkorderFilterProps = {
    data: WorkOrderType[];
    filterTerms: FilterTerm[];
    filterSections: FilterSection<WorkOrderType>[];
    onFilter: (filteredTasks: WorkOrderType[]) => void;
    setFilterTerms: (filterTerms: FilterTerm[]) => void;
    setFilterSections: (filterSection: FilterSection<WorkOrderType>[]) => void;
    invalidateCache: () => void;
    cacheAge: string;
    cacheIsInvalid: boolean;
};

const buildSubProjectSection = (
    section: FilterSection<WorkOrderType>,
    data: StatusFilterType[]
): FilterSection<WorkOrderType> => {
    const subProjectsSorted = data.sort((a, b) => optionSorter(a.key, b.key));

    section.filters[0].options = [...subProjectsSorted] || [];
    return { ...section };
};

const buildFiltersSection = (
    section: FilterSection<WorkOrderType>,
    data: Codes,
    filterTerms: FilterTerm[]
): FilterSection<WorkOrderType> => {
    const newFilters = section
        ? section.filters.map((filter) => ({
              ...filter,
              options: getFilterOptions(filter.key, data, filterTerms, filter.options),
          }))
        : [];

    const newFiltersWithOptions = newFilters.filter((f) => f.options);

    return {
        ...section,
        filters: newFiltersWithOptions,
    };
};

const WorkorderFilter: React.FC<WorkorderFilterProps> = ({
    data,
    onFilter,
    filterTerms,
    setFilterTerms,
    filterSections,
    setFilterSections,
    invalidateCache,
    cacheAge,
    cacheIsInvalid,
}) => {
    const updateFilterOptionsAsync = React.useCallback(async () => {
        const filters: Codes = {
            statuses: [],
        };
        const subProjects: StatusFilterType[] = [];

        for (let wo of data) {
            addIfNotExist(filters.statuses, getStatus(wo));
            addIfNotExist(
                subProjects,
                wo.projectIdentifier,
                `${wo.projectIdentifier}, ${wo.projectDescription}`
            );
        }

        const newFilterSections = filterSections.map((section) => {
            switch (section.key) {
                case 'subprojects':
                    return buildSubProjectSection(section, subProjects);
                case 'filters':
                    return buildFiltersSection(section, filters, filterTerms);
                default:
                    return section;
            }
        });

        setFilterSections(newFilterSections);
    }, [data, filterSections, filterTerms, setFilterSections]);

    const onFilterChange = React.useCallback(
        (filteredData: WorkOrderType[], terms: FilterTerm[]) => {
            const groupBy = getGroupByOption(filterTerms);
            const nextGroupBy = getGroupByOption(terms);

            const filtersSection = filterSections.find((section) => section.key === 'filters');

            const statusFilters = filtersSection
                ? filtersSection.filters.find((filter) => filter.key === 'status')
                : null;

            if (statusFilters && nextGroupBy === 'wp' && groupBy !== 'wp') {
                statusFilters.options = proCoSysStatusFilters;
            } else if (statusFilters && nextGroupBy !== 'wp' && groupBy === 'wp') {
                statusFilters.options = followUpStatusFilters;
            }
            onFilter(filteredData.sort(SortWorkOrdersByFilterTerms(terms)));
            setFilterTerms(terms);
        },
        []
    );

    React.useEffect(() => {
        updateFilterOptionsAsync();
    }, [filterTerms, data, updateFilterOptionsAsync]);

    const refTitle = cacheIsInvalid ? 'Data is old, click to refresh ' : 'Refresh Data';
    const toolTipRef = useTooltipRef(refTitle, 'left');

    return (
        <div style={{ flexShrink: 0, minWidth: 0 }}>
            <FilterPane
                data={data}
                sectionDefinitions={filterSections}
                terms={filterTerms}
                onChange={onFilterChange}
                screenPlacement={'right'}
                headerComponent={
                    <>
                        <span>{`Updated ${cacheAge}`}</span>
                        <IconButton ref={toolTipRef} onClick={invalidateCache}>
                            <SyncIcon color={cacheIsInvalid ? 'red' : undefined} />
                        </IconButton>
                    </>
                }
            />
        </div>
    );
};

export default WorkorderFilter;
