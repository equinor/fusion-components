import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Dropdown, { useDropdownController } from './index';
import { Button } from '@equinor/fusion-components';
import withFusionStory from '../../../../.storybook/withFusionStory';

const DropdownStory = () => {
    const controller = useDropdownController((ref, isOpen, setIsOpen) => (
        <Button ref={ref} onClick={() => setIsOpen(!isOpen)}>
            Show dropdown
        </Button>
    ));

    return (
        <div style={{ margin: '8px' }}>
            <Dropdown controller={controller}>
                Hi there! I have no styling or functionality... you need to provide that yourself.
                Check out the searchable dropdown
            </Dropdown>
        </div>
    );
};

storiesOf('General|Dropdown', module)
    .addDecorator(withFusionStory('Dropdown'))
    .add('Default', () => <DropdownStory />);
