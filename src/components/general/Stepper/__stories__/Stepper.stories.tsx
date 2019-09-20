import * as React from 'react';
import * as styles from './styles.less';

import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import { Stepper, Step } from '../index';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';

const Item = ({ children }) => {
    return <div className={styles.content}>{children}</div>;
};

const steps = [1, 2, 3, 4, 5];

const StepperStory = () => {
    return (
        <Stepper
            forceOrder={boolean('Force order', false)}
            startStep={select('Start step', steps, 1)}
            maxStep={select('Max step', steps, 3)}
        >
            <Step title="Select workspace" stepKey="step1">
                <Item>Select workspace</Item>
            </Step>
            <Step title="Select report/dashboard" stepKey="step2">
                <Item>Select a report or dashboard</Item>
            </Step>
            <Step title="Fill in details" stepKey="step3">
                <Item>Specify details about refresh rate, data source etc.</Item>
            </Step>
            <Step title="Summary" stepKey="step4">
                <Item>Summary</Item>
            </Step>
            <Step title="Publish" stepKey="step5">
                <Item>Publish button</Item>
            </Step>
        </Stepper>
    );
};

const stories = storiesOf('General|Stepper', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withFusionStory('Stepper'));
stories.add('Default', () => <StepperStory />);
