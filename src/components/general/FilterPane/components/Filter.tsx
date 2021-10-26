import { useState, useCallback, useMemo, FC, useEffect } from 'react';

import classNames from 'classnames';
import { Button, useTooltipRef, DropdownArrow } from '@equinor/fusion-components';
import SearchFilterComponent from './SearchFilterComponent';
import CheckBoxesFilterComponent from './CheckBoxesFilterComponent';
import RadioButtonsFilterComponent from './RadioButtonsFilterComponent';
import FilterTypes from '../filterTypes';
import styles from '../styles.less';
import { FilterTerm, Filter as FilterConfig } from '../applyFilters';
import { Count } from '../countFilters';
import { useFilterPaneContext } from '../FilterPaneContext';
import { useAnchor } from '../../ApplicationGuidance';

const resolveFilterComponent = (type: FilterTypes): FC<any> | null => {
    switch (type) {
        case FilterTypes.Search:
            return SearchFilterComponent;

        case FilterTypes.Checkbox:
            return CheckBoxesFilterComponent;

        case FilterTypes.Radio:
            return RadioButtonsFilterComponent;
    }

    return null;
};

function getTermPreview<T>(filter: FilterConfig<T>, term: FilterTerm | null) {
    if (!term || !term.value) {
        return null;
    }

    switch (filter.type) {
        case FilterTypes.Checkbox:
            if (typeof term.value === 'string') {
                return '';
            }

            return term.value
                .map((v) => filter.options.find((o) => o.key === v))
                .filter((option) => option)
                .map((option) => option.label)
                .join(', ');

        case FilterTypes.Radio: {
            const option = filter.options.find((o) => o.key === term.value);
            return option ? option.label : null;
        }
    }

    return null;
}

type FilterTitleProps<T> = {
    filter: FilterConfig<T>;
    term: FilterTerm | null;
};

function FilterTitle<T>({ filter, term }: FilterTitleProps<T>) {
    const termPreview = getTermPreview(filter, term);

    const tooltipRef = useTooltipRef(termPreview, 'above');

    if (!filter.title) {
        return null;
    }

    if (!termPreview) {
        return <>{filter.title}</>;
    }

    return (
        <>
            {filter.title} (<span ref={tooltipRef}>{termPreview}</span>)
        </>
    );
}

type FilterProps<T> = {
    filter: FilterConfig<T>;
    term?: FilterTerm;
    filterCount: Count[];
    onChange: (filter: FilterConfig<T>, term: FilterTerm | null) => void;
};

function Filter<T>({ filter, term: defaultTerm, filterCount, onChange, }: FilterProps<T>) {
    const [term, setTerm] = useState<FilterTerm | null>(defaultTerm || null);
    const [isCollapsed, setIsCollapsed] = useState(filter.isCollapsed);

    const anchorRef = useAnchor<HTMLHeadingElement>(filter.info);
    useEffect(() => {
        setTerm(defaultTerm || null);
    }, [defaultTerm]);

    const handleOnChange = useCallback(
        (newValue) => {
            if (!newValue) {
                setTerm(null);
                onChange(filter, null);
                return;
            }

            const newTerm = { key: filter.key, value: newValue };
            setTerm(newTerm);
            onChange(filter, newTerm);
        },
        [filter.key, onChange]
    );

    const handleOnReset = useCallback(
        (e) => {
            e.stopPropagation();
            handleOnChange(null);
        },
        [filter.key, onChange]
    );

    const toggleCollapse = useCallback(() => {
        filter.isCollapsible && setIsCollapsed(!isCollapsed);
    }, [filter.isCollapsible, isCollapsed]);

    const FilterComponent = resolveFilterComponent(filter.type);

    const containerClassNames = useMemo(
        () =>
            classNames(styles.filter, {
                [styles.isCollapsed]: isCollapsed,
                [styles.isExpanded]: !isCollapsed,
            }),
        [isCollapsed]
    );

    const filterPaneContext = useFilterPaneContext();
    if (
        !FilterComponent ||
        (filterPaneContext.paneIsCollapsed && !filter.isVisibleWhenPaneIsCollapsed)
    ) {
        return null;
    }

    const renderedFilterComponent = FilterComponent({
        options: filter.options,
        term,
        onChange: handleOnChange,
        filterCount: filterCount.find((fc) => fc.key === filter.key),
        filter,
    });

    if (!renderedFilterComponent) {
        return null;
    }

    return (
        <div className={containerClassNames}>
            {filter.title && !filterPaneContext.paneIsCollapsed && (
                <header onClick={toggleCollapse} ref={anchorRef}>
                    <h4>
                        <FilterTitle filter={filter} term={term} />
                    </h4>
                    <Button 
                        id="reset-btn"
                        frameless
                        disabled={!term || !term.value || !term.value.length}
                        onClick={handleOnReset}
                    >
                        Reset
                    </Button>
                    {filter.isCollapsible && <DropdownArrow isOpen={!isCollapsed} />}
                </header>
            )}
            {(!isCollapsed || filterPaneContext.paneIsCollapsed) && (
                <div data-cy="filter-component">{renderedFilterComponent}</div>
            )}
        </div>
    );
}

export default Filter;
