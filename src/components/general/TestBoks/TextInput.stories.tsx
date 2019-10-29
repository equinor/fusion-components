import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import BoxButton from './index';

const TestBoksStory = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div style={{ display: 'flex', padding: '8px', flexDirection: 'column' }}>
            <BoxButton label="" onClose={() => setIsOpen(isOpen)} isOpen={isOpen} />
        </div>
    );
};

storiesOf('General|TestBoks', module)
    .addDecorator(withFusionStory('TestBoks'))
    .add('Default', () => <TestBoksStory />);
