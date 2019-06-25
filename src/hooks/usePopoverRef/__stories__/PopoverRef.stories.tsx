import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../../../components/general/Button';
import usePopoverRef from '../index';

const PopoverContent = () => <div>This is a popover!</div>;

const PopoverStory = () => {
    const popoverRef = usePopoverRef(<PopoverContent />, {
        justify: 'center', // start = "left" | middle = "center" | end = "right"
        placement: 'below', // start = "top" | middle = "center" | end = "bottom"
    });

    return (
        <Button ref={popoverRef} primary contained>
            Click for popover
        </Button>
    );
};

storiesOf('Hooks|Popover', module).add('Default', () => {
    return <PopoverStory />;
});
