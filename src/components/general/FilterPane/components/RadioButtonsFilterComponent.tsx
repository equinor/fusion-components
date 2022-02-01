import PropTypes from 'prop-types';
import { useTooltipRef, RadioButton } from '@equinor/fusion-components';
import { FilterTerm } from '../applyFilters';
import { Count } from '../countFilters';
import { useFilterPaneContext } from '../FilterPaneContext';
import { FC } from 'react';

type RadioOption = {
    key: string;
    label: string;
    color?: string;
};

type RadioButtonProps = {
    option: RadioOption;
    onClick: () => void;
    isChecked: boolean;
    id?: string;
};

const RadioButtonWrapper: FC<RadioButtonProps> = ({ option, onClick, isChecked, id }) => {
    const filterPaneContext = useFilterPaneContext();
    const tooltipRef = useTooltipRef(option.label, filterPaneContext.tooltipPlacement);

    return (
        <li id={id} ref={tooltipRef} onClick={onClick}>
            <RadioButton selected={isChecked} color={option.color} />
            {!filterPaneContext.paneIsCollapsed && <label>{option.label}</label>}
        </li>
    );
};

type RadioButtonsFilterProps = {
    options: RadioOption[];
    term: FilterTerm;
    onChange: (value: string) => void;
    filterCount: Count;
    paneIsCollapsed: boolean;
};

const RadioButtonsFilterComponent: FC<RadioButtonsFilterProps> = ({
    options,
    term,
    onChange,
    paneIsCollapsed,
}) => {
    const selectSingleOption = (option) => {
        onChange(option.key);
    };

    return (
        <ul>
            {options.map((option) => (
                <RadioButtonWrapper
                    key={option.key}
                    option={option}
                    onClick={() => selectSingleOption(option)}
                    isChecked={(term && term.value) === option.key}
                />
            ))}
        </ul>
    );
};

export default RadioButtonsFilterComponent;
