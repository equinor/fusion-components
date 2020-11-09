import React, { useState, useEffect, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { Button, ErrorBoundary } from '@equinor/fusion-components';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import CollapseExpandButton from './components/CollapseExpandButton';
import Section from './components/Section';
import styles from './styles.less';
import applyFilters, {
    filterAndNotify,
    mergeTerms,
    OnFilterChangeHandler,
    FilterSection,
    FilterTerm,
} from './applyFilters';
import { applyCountAsync, Count, FilterCount } from './countFilters';
import FilterPaneContext, { IFilterPaneContext } from './FilterPaneContext';

export { default as FilterTypes } from './filterTypes';
export { applyFilters, FilterTerm, FilterSection, Count, FilterCount, CollapseExpandButton };

const FILTER_PANEL_COLLAPSED_KEY = 'FILTER_PANEL_COLLAPSED_KEY';
const createPanelCollapsedKey = (key: string) => FILTER_PANEL_COLLAPSED_KEY + key;
const getDefaultCollapsed = (key: string) => {
    const value = localStorage.getItem(createPanelCollapsedKey(key));
    return Boolean(value);
};

const persistCollapsedState = (key: string, isCollapsed: boolean) => {
    localStorage.setItem(createPanelCollapsedKey(key), isCollapsed ? 'collapsed' : '');
};

export type FilterPaneProps<T> = {
    id: string;
    data: [];
    sectionDefinitions: FilterSection<T>[];
    terms: FilterTerm[];
    onChange: OnFilterChangeHandler<T>;
    screenPlacement?: 'right' | 'left';
    onToggleCollapse?: (isCollapsed: boolean) => void;
    headerComponent?: React.ReactNode;
    quickFactScope?: string;
    onResetAll: () => void;
    showResetAllButton: boolean;
};

function FilterPane<T>({
    id,
    data,
    sectionDefinitions,
    terms,
    onChange,
    screenPlacement = 'right',
    onToggleCollapse,
    headerComponent,
    quickFactScope,
    onResetAll,
    showResetAllButton,
}: FilterPaneProps<T>) {
    const [isCollapsed, setIsCollapsed] = useState(getDefaultCollapsed(id));
    const [filterCount, setFilterCount] = useState<Count[]>([]);

    const toggleCollapsed = useCallback(() => {
        persistCollapsedState(id, !isCollapsed);
        setIsCollapsed(!isCollapsed);
        onToggleCollapse && onToggleCollapse(!isCollapsed);
    }, [isCollapsed]);

    const handleOnSectionChange = useCallback(
        async (section, filter, newTerm) => {
            const newTerms = mergeTerms(terms, filter, newTerm);

            await filterAndNotify(
                {
                    filteredData: data,
                    sectionDefinitions,
                    terms: newTerms,
                    filters: [],
                },
                onChange
            );
        },
        [data, sectionDefinitions, terms, onChange]
    );

    useEffect(() => {
        const abortController = new AbortController();
        applyCountAsync(data, sectionDefinitions, terms, setFilterCount, abortController.signal);
        return () => abortController.abort();
    }, [data, sectionDefinitions, terms]);

    const containerClassNames = classNames(
        styles.container,
        useComponentDisplayClassNames(styles),
        {
            [styles.isCollapsed]: isCollapsed,
            [styles.screenPlacementLeft]: screenPlacement === 'left',
        }
    );

    const filterPaneContext = useMemo<IFilterPaneContext>(
        () => ({
            terms,
            paneIsCollapsed: isCollapsed,
            screenPlacement,
            tooltipPlacement: screenPlacement === 'right' ? 'left' : 'right',
        }),
        [terms, screenPlacement, isCollapsed]
    );

    return (
        <FilterPaneContext.Provider value={filterPaneContext}>
            <div className={containerClassNames}>
                <div className={styles.header}>
                    <div className={styles.collapseExpandButtonContainer}>
                        <CollapseExpandButton onClick={toggleCollapsed} />
                    </div>
                    {!isCollapsed && headerComponent}
                </div>
                <div className={styles.content}>
                    {showResetAllButton && (
                        <div className={styles.resetButton}>
                            <Button frameless onClick={onResetAll}>
                                Reset filters
                            </Button>
                        </div>
                    )}
                    {sectionDefinitions.map((section) => (
                        <Section
                            key={section.key}
                            section={section}
                            terms={terms}
                            filterCount={filterCount}
                            onChange={handleOnSectionChange}
                            quickFactScope={quickFactScope}
                        />
                    ))}
                </div>
            </div>
        </FilterPaneContext.Provider>
    );
}

export default (props) => (
    <ErrorBoundary>
        <FilterPane {...props} />
    </ErrorBoundary>
);
