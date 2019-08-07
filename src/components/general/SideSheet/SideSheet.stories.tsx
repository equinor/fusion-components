import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import { ModalSideSheet, SideSheet } from './index';
import { Button } from '@equinor/fusion-components';

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
                header="This is the modal side sheet header"
                show={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}
            >
                <div style={{ padding: '0 32px' }}>This is the modal side sheet content</div>
            </ModalSideSheet>
        </div>
    );
};

const SideSheetStory = () => {
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
            <SideSheet
                show={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <div style={{ padding: '0 32px' }}>This is the side sheet content</div>
            </SideSheet>
        </div>
    );
};

storiesOf('General|SideSheet', module)
    .addDecorator(withFusionStory('Side Sheet'))
    .add('Standard', () => <SideSheetStory/>)
    .add('Modal', () => <ModalSideSheetStory />);
