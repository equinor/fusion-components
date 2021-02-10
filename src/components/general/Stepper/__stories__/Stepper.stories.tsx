import { useState } from 'react';
import styles from './styles.less';

import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import { Stepper, Step } from '../index';
import Button from '../../Button';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';

const Item = ({ children }) => {
    return <div className={styles.content}>{children}</div>;
};

const stepKeys = ['step1', 'step2', 'step3', 'step4', 'step5'];

const DefaultStory = () => {
    return (
        <Stepper
            forceOrder={boolean('Force order', false)}
            activeStepKey={select('Active step', stepKeys, 'step1')}
            hideNavButtons={boolean('Hide nav buttons', false)}
        >
            <Step
                title="Select workspace and do some other work"
                description="This is a description text"
                stepKey="step1"
            >
                <Item>Select workspace</Item>
            </Step>
            <Step title="Select report/dashboard" description="Description" stepKey="step2">
                <Item>Select a report or dashboard</Item>
            </Step>
            <Step title="Fill in details" stepKey="step3">
                <Item>Specify details about refresh rate, data source etc.</Item>
            </Step>
            <Step title="Summary" stepKey="step4">
                <Item>Summary</Item>
            </Step>
            <Step title="Publish" stepKey="step5" disabled>
                <Item>Publish button</Item>
            </Step>
        </Stepper>
    );
};

const InteractiveStory = () => {
    const [progress, setProgress] = useState<number[]>([]);

    return (
        <Stepper
            forceOrder={boolean('Force order', true)}
            activeStepKey="step1"
            hideNavButtons={boolean('Hide nav buttons', false)}
        >
            <Step title="Select workspace" stepKey="step1">
                <Item>
                    <div>Press the button to enable navigation to next step.</div>
                    <div>
                        <Button onClick={() => setProgress([...progress, 1])}>Do work</Button>
                    </div>
                </Item>
            </Step>
            <Step
                description="Description"
                title="Select report/dashboard"
                stepKey="step2"
                disabled={progress.indexOf(1) === -1}
            >
                <Item>
                    <div>Press the button to enable navigation to next step.</div>
                    <div>
                        <Button onClick={() => setProgress([...progress, 2])}>Continue</Button>
                    </div>
                </Item>
            </Step>
            <Step title="Fill in details" stepKey="step3" disabled={progress.indexOf(2) === -1}>
                <Item>You can continue immediately by navigating to the next step.</Item>
            </Step>
            <Step
                title="Summary"
                stepKey="step4"
                disabled={progress.indexOf(1) === -1 || progress.indexOf(2) === -1}
            >
                <Item>You can't go any further since maxStep is 4 in this example.</Item>
            </Step>
            <Step
                title="Publish"
                stepKey="step5"
                disabled={progress.indexOf(1) === -1 || progress.indexOf(2) === -1}
            >
                <Item>Publish button</Item>
            </Step>
        </Stepper>
    );
};

const stories = storiesOf('General/Stepper', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withFusionStory('Stepper'));
stories.add('Default', () => <DefaultStory />);
stories.add('Interactive', () => <InteractiveStory />);
