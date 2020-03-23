import { storiesOf } from '@storybook/react';
import * as React from 'react';
import withFusionStory from "../../../../../.storybook/withFusionStory";
import Chip from '../index';


const ChipsStory = () => (
    <React.Fragment>
        <Chip title="Read-only" />
        <span style={{ paddingLeft: "10px" }}></span>
        <Chip onRemove={() => { }} title="Removable" />
        <span style={{ paddingLeft: "10px" }}></span>
        <Chip isDisabled onRemove={() => { }} title="Disabled" />
    </React.Fragment>
);

storiesOf('General|Chip', module)
    .addDecorator(withFusionStory("Chip"))
    .add('Default', () => <ChipsStory />);