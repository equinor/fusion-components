import { createContext, useContext } from 'react';
import { FilterTerm } from './applyFilters';

export interface IFilterPaneContext {
    terms: FilterTerm[];
    paneIsCollapsed: boolean;
    screenPlacement: 'right' | 'left';
    tooltipPlacement: 'right' | 'left';
}

const FilterPaneContext = createContext<IFilterPaneContext>({
    terms: [],
    paneIsCollapsed: false,
    screenPlacement: 'right',
    tooltipPlacement: 'left',
});

export const useFilterPaneContext = () => {
    return useContext<IFilterPaneContext>(FilterPaneContext);
};

export default FilterPaneContext;
