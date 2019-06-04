import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../../../components/general/Button';
import usePopoverRef from '../index';

const PopoverContent = () => <div>This is a popover!</div>;

const PopoverStory = () => {
    const popoverRef = usePopoverRef(<PopoverContent />, {
        // horizontalPosition: "right",
        // verticalPosition: "top",
        justify: 'middle', // start = "left" | middle = "center" | end = "right"
        align: 'end', // start = "top" | middle = "center" | end = "bottom"
        alignArrow: 'start', // start = "left" | middle = "center" | end = "right"
    });

    return (
        <Button ref={popoverRef} primary contained>
            Click for popover
        </Button>
    );
};

storiesOf('Hooks|Popover', module).add('Popover', () => {
    return <PopoverStory />;
});
