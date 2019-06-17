import * as React from 'react';
import { storiesOf } from '@storybook/react';
import SnackBar from './index';
import Button from '../../general/Button';

const SnackBarStory = () => {
    const abortController = new AbortController();
    setTimeout(() => {
        abortController.abort();
    }, 3000);
    
    return (
        <div>
            <SnackBar
                message="This is the snack bar message"
                cancelLabel="Cancel"
                abortSignal={abortController.signal}
                cancellable
            />
        </div>
    );
};
storiesOf('Feedback|SnackBar', module).add('Default', () => <SnackBarStory />);
