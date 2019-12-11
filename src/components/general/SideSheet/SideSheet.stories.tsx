import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean, number } from '@storybook/addon-knobs';
import withFusionStory from '../../../../.storybook/withFusionStory';
import { ModalSideSheet, SideSheet } from './index';
import { Button, IconButton, WarningIcon, DoneIcon } from '@equinor/fusion-components';

const ModalSideSheetStory = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const size = select('Size', {
        'Extra large': 'xlarge',
        'Large': 'large',
        'Medium': 'medium',
        'Small': 'small',
    }, 'medium');

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
                size={size}
                onClose={() => {
                    setIsOpen(false);
                }}
                safeClose={boolean("Safe close", false)}
                headerIcons={[
                    <IconButton key="Icon1">
                        <WarningIcon outline />
                    </IconButton>,
                    <IconButton key="Icon2">
                        <DoneIcon />
                    </IconButton>,
                ]}
                isResizable={boolean("Resizable", false)}
                id="Story.ModalSidesheet"
                maxWidth={number("Max width", 0)}
                minWidth={number("Min width", 0)}
            >
                <div style={{ padding: '0 24px' }}>This is the modal side sheet content</div>
            </ModalSideSheet>
        </div>
    );
};

const StandardSideSheetStory = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const size = select('Size', {
        'Extra large': 'xlarge',
        'Large': 'large',
        'Medium': 'medium',
        'Small': 'small',
    }, 'medium');

    return (
        <div style={{ display: 'flex', height: '100%', width: '100%' }}>
            <div style={{ flexGrow: 1 }} />
            <SideSheet
                isOpen={isOpen}
                size={size}
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
    .addDecorator(withKnobs)
    .addDecorator(withFusionStory('Side Sheet'))
    .add('Modal', () => <ModalSideSheetStory />)
    .add('Standard', () => <StandardSideSheetStory />);
