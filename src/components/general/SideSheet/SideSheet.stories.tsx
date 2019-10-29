import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import { ModalSideSheet, SideSheet } from './index';
import { Button, IconButton, WarningIcon, DoneIcon } from '@equinor/fusion-components';

const ModalSideSheetStory = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div>
            <Button
                onClick={() => {
                    setIsOpen(true);
                }}
            >
                Open Side Sheet
            </Button>
            <ModalSideSheet
                header="This is the modal side sheet header "
                show={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}
                headerIcons={[
                    <IconButton key="Icon1">
                        <WarningIcon outline />
                    </IconButton>,
                    <IconButton key="Icon2">
                        <DoneIcon />
                    </IconButton>,
                ]}
            >
                <div style={{ padding: '0 24px' }}>This is the modal side sheet content</div>
            </ModalSideSheet>
        </div>
    );
};

const StandardSideSheetStory = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div style={{ display: 'flex', height: '100%', width: '100%' }}>
            <div style={{ width: '100%' }} />
            <SideSheet
                isOpen={isOpen}
                onClose={isOpen => {
                    setIsOpen(isOpen);
                }}
                id="story"
                title="This is a title"
            >
                <div style={{ paddingTop: 8, paddingLeft: 8 }} />
            </SideSheet>
        </div>
    );
};

storiesOf('General|SideSheet', module)
    .addDecorator(withFusionStory('Side Sheet'))
    .add('Modal', () => <ModalSideSheetStory />)
    .add('Standard', () => <StandardSideSheetStory />);
