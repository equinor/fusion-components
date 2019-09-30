import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import { ModalSideSheet } from './index';
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

storiesOf('General|SideSheet', module)
    .addDecorator(withFusionStory('Side Sheet'))
    .add('Modal', () => <ModalSideSheetStory />);
