import * as React from 'react';
import { storiesOf } from '@storybook/react';
import SearchableDropdown, {
    SearchableDropdownOption,
    SearchableDropdownSection,
} from './index';
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

const dropdownSections: SearchableDropdownSection[] = [
    {
        key: 'level1',
        title: 'Good food',
        items: [
            {
                key: '1',
                title: 'Pasta',
            },
            {
                key: '2',
                title: 'Pesto',
            },
        ],
    },
    {
        key: 'level2',
        title: 'Bad food',
        items: [
            {
                key: '10',
                title: 'Fish',
            },
            {
                key: '11',
                title: 'Blue cheese',
            },
            {
                key: '12',
                title: 'Shrimp',
            },
        ],
    },
];

const DropdownStory = () => {
    const [options, setOptions] = React.useState<SearchableDropdownOption[]>(dropdownOptions);
    const [optionsNoLAbel, setOptionsNoLabel] = React.useState<SearchableDropdownOption[]>(
        dropdownOptions
    );

    const [sections, setSections] = React.useState<SearchableDropdownSection[]>(dropdownSections);

    const updateOptions = item =>
        options.map(option => {
            return { ...option, isSelected: item.key === option.key };
        });

    const updateSections = (item: SearchableDropdownOption) => {
        const newSections = sections.reduce(
            (acc: SearchableDropdownSection[], curr: SearchableDropdownSection) => {
                const items = curr.items.map(option => ({
                    ...option,
                    isSelected: option.key === item.key,
                }));

                const newSection = { ...curr, items };
                acc.push(newSection);
                return acc;
            },
            []
        );

        setSections(newSections);
    };

    return (
        <div style={{ margin: '8px', maxWidth: '328px' }}>
            <SearchableDropdown
                options={options}
                label="Dropdown"
                onSelect={item => setOptions(updateOptions(item))}
            />
            <br />
            <SearchableDropdown
                options={optionsNoLAbel}
                onSelect={item => setOptionsNoLabel(updateOptions(item))}
            />
            <br />
            <SearchableDropdown
                label="Select food"
                onSelect={item => updateSections(item)}
                sections={sections}
            />
        </div>
    );
};

storiesOf('General|Searchable Dropdown', module)
    .addDecorator(withFusionStory('Searchable Dropdown'))
    .add('Default', () => <DropdownStory />);
