import { useState } from 'react';
import { storiesOf } from '@storybook/react';
import Select, { SelectOption, SelectSection } from './index';
import withFusionStory from '../../../../.storybook/withFusionStory';

const SelectOptions = [
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

const SelectSections: SelectSection[] = [
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

const SelectStory = () => {
    const [options, setOptions] = useState<SelectOption[]>(SelectOptions);
    const [optionsNoLAbel, setOptionsNoLabel] = useState<SelectOption[]>(SelectOptions);

    const [sections, setSections] = useState<SelectSection[]>(SelectSections);

    const updateOptions = (item) =>
        options.map((option) => {
            return { ...option, isSelected: item.key === option.key };
        });

    const updateSections = (item: SelectOption) => {
        const newSections = sections.reduce((acc: SelectSection[], curr: SelectSection) => {
            const items = curr.items.map((option) => ({
                ...option,
                isSelected: option.key === item.key,
            }));

            const newSection = { ...curr, items };
            acc.push(newSection);
            return acc;
        }, []);

        setSections(newSections);
    };

    return (
        <div style={{ margin: '8px' }}>
            <Select
                options={optionsNoLAbel}
                onSelect={(item) => setOptionsNoLabel(updateOptions(item))}
            />
            <br />
            <Select
                disabled
                placeholder={'Disabled'}
                onSelect={(item) => updateSections(item)}
                sections={sections}
            />
            <br />
            <Select
                onSelect={(item) => updateSections(item)}
                sections={sections}
                placeholder={'Select food'}
            />
            <br />
            <div style={{ width: '300px' }}>
                <Select
                    placeholder={'Select food'}
                    onSelect={(item) => updateSections(item)}
                    sections={sections}
                    dropdownMaxHeight={300}
                />
            </div>
        </div>
    );
};

storiesOf('General/Select', module)
    .addDecorator(withFusionStory('Select'))
    .add('Default', () => <SelectStory />);
