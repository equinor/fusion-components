import React from 'react';

import { ContextTypes, useFusionContext } from '@equinor/fusion';
import ContextSelector from '../../../core/ContextSelector';
import FusionHeader from '../../../core/Header';
import FusionContent from '../../../core/Content';
import GardenDemo from './GardenDemo';

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

export const DemoHangingGarden = () => {
    return (
        <CurrentContext>
            <FusionHeader start={null} content={ContextSelector} aside={null} settings={null} />
            <FusionContent>
                <div style={{ display: 'flex', flex: '1 1 auto', height: '100%', minWidth: 0 }}>
                    <GardenDemo />
                </div>
            </FusionContent>
        </CurrentContext>
    );
};

DemoHangingGarden.storyName = 'Hanging Garden';

export default {
    title: 'Data/Hanging Garden',
    component: DemoHangingGarden,
    paramaters: { docs: { page: () => <div>hallo</div> } },
};

//sstoriesOf('Data/Hanging Garden', module).add('Default', () => <DemoHangingGarden />);
