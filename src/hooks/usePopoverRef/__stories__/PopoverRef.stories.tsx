import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from "../../../../.storybook/withFusionStory";
import Button from '../../../components/general/Button';
import usePopoverRef from '../index';

const PopoverContent = () => <div>This is a popover!</div>;

const PopoverStory = () => {
    const [popoverRef, isOpen] = usePopoverRef(<PopoverContent />, {
        justify: 'center', // start = "left" | middle = "center" | end = "right"
        placement: 'below', // start = "top" | middle = "center" | end = "bottom"
    });

    return (
        <Button ref={popoverRef} contained>
            Click for popover
        </Button>
    );
};

storiesOf('Hooks|Popover', module)
    .addDecorator(withFusionStory("Popover"))
    .add('Default', () => {
        return <PopoverStory />;
    });
