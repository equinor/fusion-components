import React from 'react';
import { storiesOf } from '@storybook/react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from './index';
import Button from '../../general/Button';

const DialogStory = () => {
    const [open, setOpen] = React.useState(true);
    return (
        <div style={{ height: '100%' }}>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>New Dialog</DialogTitle>
                <DialogContent scrollable>This is the content of the Dialog
                This is the content of the Dialog
                This is the content of the Dialog
                This is the content of the Dialog
                This is the content of the Dialog
                This is the content of the Dialog
                This is the content of the Dialog
                This is the content of the Dialog
                This is the content of the Dialog

                </DialogContent>
                <DialogActions>
                    <Button primary comfortable frameless>
                        Button
                    </Button>
                    <Button primary comfortable frameless>
                        Button
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

storiesOf('Feedback|Dialog', module).add('Default', () => <DialogStory />);
