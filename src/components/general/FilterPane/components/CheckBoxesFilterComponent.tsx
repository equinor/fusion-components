import { useTooltipRef, CheckBox } from '@equinor/fusion-components';
import { FilterTerm } from '../applyFilters';
import { Count } from '../countFilters';
import { useFilterPaneContext } from '../FilterPaneContext';

type CheckBoxOption = {
    key: string;
    label: string;
    color?: string;
    hideCount?: boolean;
};

type OnChangeHandler = (newTerms: string[] | null) => void;

type CheckBoxesFilterProps = {
    options: CheckBoxOption[];
    term?: FilterTerm;
    onChange: OnChangeHandler;
    filterCount: Count;
};

type CheckBoxWrapperProps = {
    option: CheckBoxOption;
    term: FilterTerm;
    filterCount: Count;
    onChange: OnChangeHandler;
};

const getCountForOption = (option: CheckBoxOption, filterCount: Count) => {
    if (!filterCount || typeof filterCount.count === 'number') {
        return -1;
    }

    const countForOption = filterCount.count.find((c) => c.key === option.key);

    if (!countForOption) {
        return -1;
    }

    return countForOption.count;
};

const CheckboxWrapper: React.FC<CheckBoxWrapperProps> = ({
    option,
    term,
    filterCount,
    onChange,
}) => {
    const selectSingleOption = () => {
        let newValue: string[] | null = [option.key];

        if (term && term.value.length === 1 && option.key === term.value[0]) {
            newValue = null;
        }

        onChange(newValue);
    };

    const toggleOption = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        const index = term.value.indexOf(option.key);

        let newValue: string[] | null = [...term.value];
        if (index === -1) {
            newValue.push(option.key);
        } else {
            newValue.splice(index, 1);
        }

        if (!newValue.length) {
            newValue = null;
        }

        onChange(newValue);
    };

    const optionCount = getCountForOption(option, filterCount);
    const isChecked = term.value.indexOf(option.key) > -1;
    const filterPaneContext = useFilterPaneContext();
    const count = !option.hideCount ? ` (${optionCount})` : '';
    const tooltipRef = useTooltipRef(`${option.label}${count}`, filterPaneContext.tooltipPlacement);

    if (optionCount === 0 && !isChecked) {
        return null;
    }

    return (
        <li onClick={selectSingleOption} ref={tooltipRef}>
            <span>
                <CheckBox selected={isChecked} color={option.color} onChange={toggleOption} />
            </span>
            {!filterPaneContext.paneIsCollapsed && (
                <label>
                    {option.label}
                    {count}
                </label>
            )}
        </li>
    );
};

const CheckBoxesFilterComponent: React.FC<CheckBoxesFilterProps> = ({
    options,
    term,
    filterCount,
    onChange,
}) => {
    const ensuredTerm = term || { key: '', value: [] };

    const renderedOptions = options
        .filter((option) => getCountForOption(option, filterCount) !== 0)
        .map((option) => (
            <CheckboxWrapper
                key={option.key}
                option={option}
                term={ensuredTerm}
                filterCount={filterCount}
                onChange={onChange}
            />
        ));

    if (!renderedOptions.length) {
        return null;
    }

    return <ul>{renderedOptions}</ul>;
};

export default CheckBoxesFilterComponent;
