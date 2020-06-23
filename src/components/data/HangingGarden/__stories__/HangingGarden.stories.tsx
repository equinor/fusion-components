import React from 'react';
import { storiesOf } from '@storybook/react';
import { ContextTypes, useFusionContext } from '@equinor/fusion';
import ContextSelector from '../../../core/ContextSelector';
import FusionHeader from '../../../core/Header';
import FusionContent from '../../../core/Content';
import WorkOrderGarden from './WorkOrderGarden';

const CurrentContext: React.FC = ({ children }) => {
    const { app } = useFusionContext();

    (app.container as any)._currentApp.state = {
        AppComponent: ContextSelector,
        key: 'HangingGarden',
        name: 'HangingGarden',
        shortName: 'HangingGarden',
        version: '1',
        description: 'HangingGarden',
        tags: ['HangingGarden'],
        context: {
            types: [ContextTypes.ProjectMaster],
        },
    };

    return <> {children} </>;
};

const DemoHangingGarden: React.FC = () => {
    return (
        <CurrentContext>
            <FusionHeader start={null} content={ContextSelector} aside={null} />
            <FusionContent>
                <div style={{ display: 'flex', flex: '1 1 auto', height: '100%', minWidth: 0 }}>
                    <WorkOrderGarden />
                </div>
            </FusionContent>
        </CurrentContext>
    );
};

storiesOf('Data|Hanging Garden', module).add('Default', () => <DemoHangingGarden />);
