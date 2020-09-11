import * as React from 'react';
import {
    FilterTerm,
    FilterSection,
    applyFilters,
    ErrorBoundary,
    ErrorMessage,
    Spinner,
} from '../../../../../index';
import * as styles from './styles.less';
import { useCurrentContext, useAppSettings } from '@equinor/fusion';
import WorkOrderType from './models/WorkOrderType';

import { getItemSearchableValues, SortWorkOrdersByFilterTerms } from './filter/filter';
import WorkorderFilter from './filter';
import Garden from './garden';
import WorkOrderSideSheet from './sideSheet';
import { useHangingGardenData } from '../../';

import FilterSectionDefinitions from './models/FilterSectionDefinitions';
import { ErrorMessageProps } from '../../../../general/ErrorMessage';
import { FilterOptions } from '../../../../general/FilterPane/applyFilters';

export type WorkOrderGardenProps = {};

const defaultFilterTerms = [
    {
        key: 'group-by',
        value: 'fwp',
    },
];

const WorkOrderGarden: React.FC<WorkOrderGardenProps> = () => {
    const currentContext = useCurrentContext();
    const [localAppSettings, setAppSettingAsync] = useAppSettings();

    const [errorMessage, setErrorMessage] = React.useState<ErrorMessageProps | null>(null);
    const [filteredData, setFilteredData] = React.useState<WorkOrderType[]>([]);
    const [filterSections, setFilterSections] = React.useState<FilterSection<WorkOrderType>[]>(
        FilterSectionDefinitions
    );
    const [filterTerms, setFilterTerms] = React.useState<FilterTerm[]>(
        currentContext && currentContext?.id in localAppSettings
            ? localAppSettings[currentContext.id]
            : defaultFilterTerms
    );

    const applyToFetchedData = React.useCallback(
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

    const [selectedWorkOrder, setSelectedWorkOrder] = React.useState<WorkOrderType | null>(null);
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

    React.useEffect(() => {
        invalidate();
        setFilterTerms(
            currentContext && currentContext?.id in localAppSettings
                ? localAppSettings[currentContext.id]
                : defaultFilterTerms
        );
    }, [currentContext?.id]);

    React.useEffect(() => {
        if (data.length <= 0) return;

        applyFilter();
    }, [data]);

    React.useEffect(() => {
        error ? setError(error) : setErrorMessage(null);
    }, [error]);

    const setError = (error: Error) => {
        setFilteredData([]);
        switch (error.name) {
            case 'noData':
                setErrorMessage({
                    hasError: true,
                    errorType: 'noData',
                    message: 'No workorders found for selected project',
                    resourceName: 'workorder',
                    title: 'Workorders',
                    action: 'Retry',
                    onTakeAction: retry,
                });
                break;
            case 'noCache':
                setErrorMessage({
                    hasError: true,
                    errorType: 'noData',
                    message:
                        'Populating workorders dataset for project on the server. Please try again in a few minutes.',
                    resourceName: 'workorder',
                    title: 'Workorders',
                    action: 'Retry',
                    onTakeAction: retry,
                });
                break;
            default:
                setErrorMessage({
                    hasError: true,
                    errorType: 'error',
                    onTakeAction: retry,
                });
        }
    };

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
