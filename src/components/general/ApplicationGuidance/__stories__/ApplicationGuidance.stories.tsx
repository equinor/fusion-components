import React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';

import { Button } from '../../Button';
import { SideSheet } from '../../SideSheet';

import '../../../../customElements/components/application-guide';
import { useAnchor } from '../components/Anchor';

const Story: React.FC = () => {
    const scope = 'storybook';
    const [showSideSheet, setShowSideSheet] = React.useState(true);
    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', flexGrow: 1 }}>
                <Button ref={useAnchor({ scope, id: 'button' })}>
                    This button has snuggly fitted anchor
                </Button>
                <div ref={useAnchor({ scope: scope, id: 'multiple-element' })}>
                    <Button>Another button</Button>
                    <p>This anchor contains multiple components</p>
                </div>
            </div>
            <SideSheet
                id="stoybook"
                title="Stuff in here"
                isOpen={showSideSheet}
                onClose={setShowSideSheet}
            >
                <fusion-overlay-anchor anchor="just-texts" scope={scope}>
                    <p style={{ margin: 32, display: 'block' }}>
                        Text needs to be wrapped in something. This text is wrapped with
                        &lt;p&gt;&lt;/p&gt;
                    </p>
                </fusion-overlay-anchor>
            </SideSheet>
        </div>
    );
};

storiesOf('Application Guidance/Application Guidance', module)
    .addParameters({ jest: ['DataTable.stories.jsx'] })
    .addDecorator(withFusionStory('Data Table'))
    .add('Default', () => <Story />);
