import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from "../../../../../.storybook/withFusionStory";
import Chip from '../index';


const ChipsStory = () => (
    <React.Fragment>
        <Chip title="Read-only" />
        <span style={{ "padding-left": "10px" }}></span>
        <Chip onRemove={() => { }} title="Removable" />
    </React.Fragment>
);

storiesOf('General|Chip', module)
    .addDecorator(withFusionStory("Chip"))
    .add('Default', () => <ChipsStory />);