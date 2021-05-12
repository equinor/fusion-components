import { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DropdownArrow } from '@equinor/fusion-components';
import Filter from './Filter';
import styles from '../styles.less';
import { FilterTerm, FilterSection, Filter as FilterType } from '../applyFilters';
import { Count } from '../countFilters';
import { useFilterPaneContext } from '../FilterPaneContext';
import { ApplicationGuidanceAnchor } from '../../ApplicationGuidance';

type SectionProps<T> = {
    terms: FilterTerm[];
    filterCount: Count[];
    section: FilterSection<T>;
    onChange: (section: FilterSection<T>, filter: FilterType<T>, value: string | string[]) => void;
    quickFactScope?: string;
};

function Section<T>({ terms, filterCount, section, onChange, quickFactScope }: SectionProps<T>) {
    const [isCollapsed, setIsCollapsed] = useState(section.isCollapsed);

    const handleOnFilterChange = useCallback(
        (filter, newValue) => onChange(section, filter, newValue),
        [section.key, onChange]
    );

    const toggleCollapse = useCallback(() => {
        section.isCollapsible && setIsCollapsed(!isCollapsed);
    }, [isCollapsed]);

    const sectionClassNames = useMemo(
        () =>
            classNames({
                [styles.isCollapsed]: isCollapsed,
                [styles.hasTitle]: section.title,
            }),
        [isCollapsed, section.title]
    );

    const renderedFilterComponents = section.filters.map((filter) => {
        const term = terms.find((term) => term.key === filter.key);
        return (
            <Filter
                key={`${filter.key}_${term?.value}`}
                filter={filter}
                term={terms.find((term) => term.key === filter.key)}
                filterCount={filterCount}
                onChange={handleOnFilterChange}
                quickFactScope={quickFactScope}
            />
        );
    });

    const hasFiltersVisibleWhenCollapsed =
        section.filters.filter((filter) => filter.isVisibleWhenPaneIsCollapsed).length > 0;

    const filterPaneContext = useFilterPaneContext();

    if (
        !renderedFilterComponents.filter((renderedFilterComponent) => renderedFilterComponent)
            .length ||
        (filterPaneContext.paneIsCollapsed && !hasFiltersVisibleWhenCollapsed)
    ) {
        return null;
    }

    return (
        <section className={sectionClassNames}>
            {!filterPaneContext.paneIsCollapsed && (
                <header onClick={toggleCollapse}>
                    <ApplicationGuidanceAnchor anchor={section.key} scope={quickFactScope} snug>
                        <h3>{section.title}</h3>
                    </ApplicationGuidanceAnchor>
                    {section.isCollapsible && (
                        <>
                            <DropdownArrow isOpen={!isCollapsed} />
                        </>
                    )}
                </header>
            )}
            {(!isCollapsed || filterPaneContext.paneIsCollapsed) && (
                <div>{renderedFilterComponents}</div>
            )}
        </section>
    );
}

export default Section;
