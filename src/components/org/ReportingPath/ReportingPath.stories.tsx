import React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import ReportingPath from ".";

const ReportingPathStory = () => {
    return(
        <ReportingPath />
    )
}

storiesOf('Org|Reporting Path', module)
    .addDecorator(withFusionStory('Reporting Path'))
    .add('Default', () => <ReportingPathStory />);
