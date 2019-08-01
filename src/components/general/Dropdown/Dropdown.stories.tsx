import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Dropdown from './index';

const DropdownStory = () => {
    const [selected, setSelected] = React.useState('');
    return (
        <div style={{ margin: '8px' }}>
            <Dropdown
                selections={[
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
                label="Dropdown"
                selected = {selected}
                onSelect={item => setSelected(item.title)}
            />
            <br/>
            <Dropdown
                selections={[
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
                selected = {selected}
                onSelect={item => setSelected(item.title)}
            />
        </div>
    );
};

storiesOf('General|Dropdown', module).add('Default', () => <DropdownStory />);
