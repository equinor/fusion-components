import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import RequestWorkflow from '.';
import { createInitialWorkflow, createInitialProvisioningStatus } from './createInitialWorkflow';
import { Button } from '../Button';
import { useCallback, useState } from 'react';

const RequestWorkflowStory = () => {
    const [workflow, setWorkflow] = useState(null);
    const initialWorkflow = createInitialWorkflow();
    const initialProvisioningStatus = createInitialProvisioningStatus();
    const initiateWorkflow = useCallback(() => {
        setWorkflow(initialWorkflow);
    }, [setWorkflow, initialWorkflow]);
    return (
        <div>
            <Button onClick={initiateWorkflow}>Initiate Workflow</Button>
            <RequestWorkflow workflow={workflow} provisioningStatus={initialProvisioningStatus} />
        </div>
    );
};

storiesOf('Genereal/Request Workflow', module)
    .addDecorator(withFusionStory('Request Workflow'))
    .add('Default', () => <RequestWorkflowStory />);
