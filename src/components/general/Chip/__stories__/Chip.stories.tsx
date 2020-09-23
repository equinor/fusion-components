import { storiesOf } from '@storybook/react';
import * as React from 'react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import Chip from '../index';

const ChipsStory = () => (
    <React.Fragment>
        <Chip id="read-only-chip" title="Read-only" quickFactScope="storybook" />
        <span style={{ paddingLeft: '10px' }}></span>
        <Chip onRemove={() => {}} title="Removable" />
        <span style={{ paddingLeft: '10px' }}></span>
        <Chip isDisabled title="Disabled" />
        <span style={{ paddingLeft: '10px' }}></span>
        <Chip primary onRemove={() => {}} title="Primary" />
        <span style={{ paddingLeft: '10px' }}></span>
        <Chip secondary onRemove={() => {}} title="Secondary" />
    </React.Fragment>
);

storiesOf('General|Chip', module)
    .addDecorator(withFusionStory('Chip'))
    .add('Default', () => <ChipsStory />);
