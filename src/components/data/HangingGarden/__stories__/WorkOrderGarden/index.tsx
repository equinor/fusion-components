import {
    FilterTerm,
    FilterSection,
    applyFilters,
    ErrorBoundary,
    ErrorMessage,
    Spinner,
} from '../../../../../index';
import styles from './styles.less';
import { useCurrentContext, useAppSettings } from '@equinor/fusion';
import WorkOrderType from './models/WorkOrderType';

import { getItemSearchableValues, SortWorkOrdersByFilterTerms } from './filter/filter';
import WorkorderFilter from './filter';
import Garden from './garden';
import WorkOrderSideSheet from './sideSheet';
import { useHangingGardenData, useHangingGardenErrorMessage } from '../../';

import FilterSectionDefinitions from './models/FilterSectionDefinitions';
import { FilterOptions } from '../../../../general/FilterPane/applyFilters';
import { FC, useState, useCallback, useEffect } from 'react';

export type WorkOrderGardenProps = {};

const defaultFilterTerms = [
    {
        key: 'group-by',
        value: 'fwp',
    },
];

const WorkOrderGarden: FC<WorkOrderGardenProps> = () => {
    const currentContext = useCurrentContext();
    const [localAppSettings, setAppSettingAsync] = useAppSettings();

    const [filteredData, setFilteredData] = useState<WorkOrderType[]>([]);
    const [filterSections, setFilterSections] = useState<FilterSection<WorkOrderType>[]>(
        FilterSectionDefinitions
    );
    const [filterTerms, setFilterTerms] = useState<FilterTerm[]>(
        currentContext && currentContext?.id in localAppSettings
            ? localAppSettings[currentContext.id]
            : defaultFilterTerms
    );

    const applyToFetchedData = useCallback(
        ((filterTerms: FilterTerm[]) => (data: WorkOrderType[]) =>
            data.sort(SortWorkOrdersByFilterTerms(filterTerms)))(filterTerms),
        [filterTerms]
    );

    const {
        data,
        error,
        isFetching,
        retry,
        invalidate,
        cacheIsInvalid,
        cacheAge,
    } = useHangingGardenData(
        'dataProxy',
        'getWorkOrdersAsync',
        applyToFetchedData,
        getItemSearchableValues
    );

    const { errorMessage } = useHangingGardenErrorMessage('handover', error, retry);

    const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrderType | null>(null);
    const updateFilterTerms = (terms: FilterTerm[]) => {
        setFilterTerms(terms);
        if (currentContext?.id)
            setAppSettingAsync(
                currentContext.id,
                terms.filter((term) => term.key !== 'search')
            );
    };

    const applyFilter = () => {
        const filterOptions: FilterOptions<WorkOrderType> = {
            terms: filterTerms,
            sectionDefinitions: filterSections,
        };

        applyFilters<WorkOrderType>(data, filterOptions).then((r) => setFilteredData(r));
    };

    useEffect(() => {
        invalidate();
        setFilterTerms(
            currentContext && currentContext?.id in localAppSettings
                ? localAppSettings[currentContext.id]
                : defaultFilterTerms
        );
    }, [currentContext?.id]);

    useEffect(() => {
        if (data.length <= 0) return;

        applyFilter();
    }, [data]);

    return (
        <ErrorBoundary>
            <ErrorMessage {...errorMessage}>
                {isFetching && <Spinner title="Fetching Workorders" centered floating />}
                {!isFetching && data.length && (
                    <>
                        <div className={styles.hanginggardenContainer}>
                            <Garden
                                filteredData={filteredData}
                                filterTerms={filterTerms}
                                selectedWorkOrder={selectedWorkOrder}
                                setSelectedWorkOrder={setSelectedWorkOrder}
                            />
                            <WorkorderFilter
                                data={data}
                                filterTerms={filterTerms}
                                onFilter={setFilteredData}
                                setFilterTerms={updateFilterTerms}
                                filterSections={filterSections}
                                setFilterSections={setFilterSections}
                                invalidateCache={invalidate}
                                cacheAge={cacheAge}
                                cacheIsInvalid={cacheIsInvalid}
                            />
                        </div>
                        {selectedWorkOrder && (
                            <WorkOrderSideSheet
                                workOrder={selectedWorkOrder}
                                setSelectedWorkOrder={setSelectedWorkOrder}
                            />
                        )}
                    </>
                )}
            </ErrorMessage>
        </ErrorBoundary>
    );
};

export default WorkOrderGarden;
