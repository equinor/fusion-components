import React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import { Button, SideSheet, ModalSideSheet } from '@equinor/fusion-components';
import '../Anchor';
import '../Wrapper';
import '../Scope';
import { useOnAnchorToggle } from '../Anchor';

const Story: React.FC = () => {
    const [showSideSheet, setShowSideSheet] = React.useState(true);
    const [showModalSideSheet, setShowModalSideSheet] = React.useState(false);

    const modalAnchorRef = useOnAnchorToggle((isActive) => {
        if(isActive) {
            setShowModalSideSheet(isActive);
        }
    });

    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <ModalSideSheet
                header="Scope things within here"
                screenPlacement="right"
                show={showModalSideSheet}
                onClose={() => setShowModalSideSheet(false)}
                size="large"
            >
                <app-guide-scope scope="some-unique-sidesheet-scope" active={showModalSideSheet}>
                    <app-guide-anchor scope="some-unique-sidesheet-scope" id="hi-there">
                        <p>Hi there</p>
                    </app-guide-anchor>
                </app-guide-scope>
            </ModalSideSheet>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', flexGrow: 1 }}>
                <app-guide-anchor scope="storybook" id="button">
                    <Button>Hei</Button>
                </app-guide-anchor>
                <app-guide-anchor scope="storybook" id="another-button">
                    <Button>Hei</Button>
                    <p>It can haz multiple things</p>
                </app-guide-anchor>
                <app-guide-anchor scope="storybook" id="opens-modal" ref={modalAnchorRef}>
                    <Button onClick={() => setShowModalSideSheet(true)}>
                        This button opens a modal with scoped quick facts
                    </Button>
                </app-guide-anchor>
            </div>
            <SideSheet title="Stuff in here" isOpen={showSideSheet} onClose={setShowSideSheet}>
                <app-guide-anchor scope="storybook" id="just-text">
                    <p>
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
