import React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import { Button, SideSheet } from '@equinor/fusion-components';
import '../Anchor';
import '../Wrapper';
import '../Scope';

const Story: React.FC = () => {
    const [showSideSheet, setShowSideSheet] = React.useState(true);


    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', flexGrow: 1 }}>
                <app-guide-anchor scope="storybook" id="button" snug-fit>
                    <Button>This button has snuggly fitted anchor</Button>
                </app-guide-anchor>


                <app-guide-anchor scope="storybook" id="another-button">
                    <Button>Another button</Button>
                    <p>This anchor contains multiple components</p>
                </app-guide-anchor>
            </div>
            <SideSheet title="Stuff in here" isOpen={showSideSheet} onClose={setShowSideSheet}>
                <app-guide-anchor scope="storybook" id="just-text">
                    <p style={{ margin: 32, display: "block" }}>
                        Text needs to be wrapped in something. This text is wrapped with
                        &lt;p&gt;&lt;/p&gt;
                    </p>
                </app-guide-anchor>
            </SideSheet>
        </div>
    );
};

storiesOf('Application Guidance|Application Guidance', module)
    .addParameters({ jest: ['DataTable.stories.jsx'] })
    .addDecorator(withFusionStory('Data Table'))
    .add('Default', () => <Story />);
