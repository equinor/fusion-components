import * as React from 'react';
import { storiesOf } from '@storybook/react';
import SnackBar, { horizontalPositions, verticalPositions } from './index';
import Button from '../../general/Button';

const SnackBarStory = () => {
    const [open, setOpen] = React.useState(false);
    return (
        <div>
            <Button primary comfortable onClick={() => setOpen(true)}>
                Snack time!
            </Button>
            <SnackBar
                verticalPosition={verticalPositions.bottom}
                horizontalPosition={horizontalPositions.center}
                message="This is the snack bar message"
                actions={[
                    <Button primary comfortable frameless onClick={() => setOpen(false)}>
                        Close
                    </Button>,
                ]}
                onClose={() => setOpen(false)}
                open={open}
                autoHideDuration={3000}
            />
        </div>
    );
};
storiesOf('Feedback|SnackBar', module).add('Default', () => <SnackBarStory />);
