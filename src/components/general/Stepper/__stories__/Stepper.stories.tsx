import * as React from 'react';
import * as styles from './styles.less';

import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import { Stepper, Step } from '../index';

const StepperStory = () => {
    const handleChange = stepKey => console.log(stepKey);

    return (
        <Stepper forceOrder={true} initialStepKey="fill-in-details" onChange={handleChange}>
            <Step title="Select workspace" stepKey="select-workspace">
                <div className={styles.content}>Select workspace</div>
            </Step>
            <Step title="Select report/dashboard" stepKey="select-report-dashboard">
                <div className={styles.content}>Select a report or dashboard</div>
            </Step>
            <Step title="Fill in details" stepKey="fill-in-details">
                <div className={styles.content}>
                    Specify details about refresh rate, data source etc.
                </div>
            </Step>
            <Step title="Summary" stepKey="summary">
                <div className={styles.content}>Summary</div>
            </Step>
            <Step title="Publish" stepKey="publish" disabled>
                <div className={styles.content}>Publish button</div>
            </Step>
        </Stepper>
    );
};

storiesOf('General|Stepper', module)
    .addParameters({ jest: ['Stepper.stories.jsx'] })
    .addDecorator(withFusionStory('Stepper'))
    .add('Default', () => <StepperStory />);
