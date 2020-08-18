import React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';

import { ApplicationGuidanceAnchor } from '../components/Anchor';
import { Button } from '../../Button';
import { SideSheet } from '../../SideSheet';

const Story: React.FC = () => {
    const [showSideSheet, setShowSideSheet] = React.useState(true);

    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', flexGrow: 1 }}>
                <ApplicationGuidanceAnchor scope="storybook" id="button" snug>
                    <Button>This button has snuggly fitted anchor</Button>
                </ApplicationGuidanceAnchor>

                <ApplicationGuidanceAnchor scope="storybook" id="another-button">
                    <Button>Another button</Button>
                    <p>This anchor contains multiple components</p>
                </ApplicationGuidanceAnchor>
            </div>
            <SideSheet id="stoybook" title="Stuff in here" isOpen={showSideSheet} onClose={setShowSideSheet}>
                <fusion-app-guide-anchor scope="storybook" id="just-text">
                    <p style={{ margin: 32, display: 'block' }}>
                        Text needs to be wrapped in something. This text is wrapped with
                        &lt;p&gt;&lt;/p&gt;
                    </p>
                </fusion-app-guide-anchor>
            </SideSheet>
        </div>
    );
};

storiesOf('Application Guidance|Application Guidance', module)
    .addParameters({ jest: ['DataTable.stories.jsx'] })
    .addDecorator(withFusionStory('Data Table'))
    .add('Default', () => <Story />);
