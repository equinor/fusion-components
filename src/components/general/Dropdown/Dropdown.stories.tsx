import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Dropdown from './index';
import withFusionStory from '../../../../.storybook/withFusionStory';

const DropdownStory = () => {
    const [selected, setSelected] = React.useState('');
    const [selectedNoLabel, setSelectedNoLabel] = React.useState('');
    return (
        <div style={{ margin: '8px' }}>
            <Dropdown
                options={[
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
                ]}
                label="Dropdown"
                selected={selected}
                onSelect={item => setSelected(item.title)}
            />
            <br />
            <Dropdown
                options={[
                    {
                        key: '1',
                        title: 'First',
                    },
                    {
                        key: '2',
                        title: 'Selected',
                    },
                    {
                        key: '3',
                        title: 'Disabled',
                    },
                    {
                        key: '4',
                        title: 'Last',
                    },
                ]}
                selected={selectedNoLabel}
                onSelect={item => setSelectedNoLabel(item.title)}
            />
        </div>
    );
};

storiesOf('General|Dropdown', module)
    .addDecorator(withFusionStory('Dropdown'))
    .add('Default', () => <DropdownStory />);
