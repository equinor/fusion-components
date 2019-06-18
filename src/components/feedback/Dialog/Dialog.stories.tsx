import React from 'react';
import { storiesOf } from '@storybook/react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from './index';
import Button from '../../general/Button';

const DialogStory = () => {
    return (
        <div style={{ height: '100%', }}>
            <Dialog>
                <DialogTitle>New Dialog</DialogTitle>
                <DialogContent >This is the content of the Dialog
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
            <br />
            <Dialog>
                <DialogTitle>New Dialog</DialogTitle>
                <DialogContent >This is the content of the Dialog
                    This is the content of the Dialog
                    This is the content of the DialogThis is the content of the DialogThis is the content of the Dialog
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
            <br />
            <Dialog>
                <DialogTitle>New Dialog</DialogTitle>
                <DialogContent>This is the content of the Dialog
                This is the content of the Dialog
                This is the content of the Dialog
                This is the content of the Dialog
                This is the content of the DialogThis is the content of the Dialog
                This is the content of the DialogThis is the content of the Dialog
                This is the content of the DialogThis is the content of the Dialog
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
