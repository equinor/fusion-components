import { storiesOf } from '@storybook/react';
import { Fragment } from 'react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import Chip from '../index';

const ChipsStory = () => (
    <Fragment>
        <Chip title="Read-only" />
        <span style={{ paddingLeft: '10px' }}></span>
        <Chip onRemove={() => {}} title="Removable" />
        <span style={{ paddingLeft: '10px' }}></span>
        <Chip isDisabled title="Disabled" />
        <span style={{ paddingLeft: '10px' }}></span>
        <Chip primary onRemove={() => {}} title="Primary" />
        <span style={{ paddingLeft: '10px' }}></span>
        <Chip secondary onRemove={() => {}} title="Secondary" />
    </Fragment>
);

storiesOf('General/Chip', module)
    .addDecorator(withFusionStory('Chip'))
    .add('Default', () => <ChipsStory />);
