import * as React from 'react';
import { storiesOf } from '@storybook/react';
import SnackBar from './index';
import Button from '../../general/Button';

const SnackBarStory = () => {
    const [open, setOpen] = React.useState(false);
    return (
        <div>
            <Button primary comfortable onClick={() => setOpen(true)}>
                Snack time!
            </Button>
            <SnackBar
                message="This is the snack bar message"
                open={open}
                cancelLabel="Cancel"
                onCancel ={() => setOpen(false)}
            />
        </div>
    );
};
storiesOf('Feedback|SnackBar', module).add('Default', () => <SnackBarStory />);
