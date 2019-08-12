import * as React from 'react';
import { storiesOf } from '@storybook/react';
import SearchableDropdownWrapper, { SearchableDropdownOption } from './index';
import withFusionStory from '../../../../.storybook/withFusionStory';

const dropdownOptions = [
    {
        key: '1',
        title: 'First',
    },
    {
        key: '2',
        title: 'Selected',
        isSelected: true,
    },
    {
        key: '3',
        title: 'Disabled',
        isDisabled: true,
    },
    {
        key: '4',
        title: 'Last',
    },
];

const DropdownStory = () => {
    const [options, setOptions] = React.useState<SearchableDropdownOption[]>(dropdownOptions);
    const [optionsNoLAbel, setOptionsNoLabel] = React.useState<SearchableDropdownOption[]>(
        dropdownOptions
    );

    const updateOptions = item =>
        options.map(option => {
            return { ...option, isSelected: item.key === option.key };
        });

    return (
        <div style={{ margin: '8px' }}>
            <SearchableDropdownWrapper
                options={options}
                label="Dropdown"
                onSelect={item => setOptions(updateOptions(item))}
            />
            <br />
            <SearchableDropdownWrapper
                options={optionsNoLAbel}
                onSelect={item => setOptionsNoLabel(updateOptions(item))}
            />
        </div>
    );
};

storiesOf('General|Searchable Dropdown', module)
    .addDecorator(withFusionStory('Searchable Dropdown'))
    .add('Default', () => <DropdownStory />);
