import { storiesOf } from '@storybook/react';
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs';
import withFusionStory from '../../../../.storybook/withFusionStory';
import Button from '../../../components/general/Button';
import usePopoverRef, { PopoverJustification, PopoverPlacement } from '../index';

const justifyOptions: { [key: string]: PopoverJustification } = {
    Start: 'start',
    Center: 'center',
    End: 'end',
};

const placementOptions: { [key: string]: PopoverPlacement } = {
    Below: 'below',
    Above: 'above',
    Left: 'left',
    Right: 'right',
};

const PopoverContent = ({ content }) => <div>{content}</div>;

const PopoverStory = () => {
    const [popoverRef] = usePopoverRef(
        <PopoverContent content={text('Popover text', 'This is a popover!')} />,
        {
            justify: select('Justification', justifyOptions, 'center'),
            placement: select('Placement', placementOptions, 'below'),
            centered: boolean('Centered', true),
        }
    );

    return (
        <Button ref={popoverRef} contained>
            Click for popover
        </Button>
    );
};

storiesOf('Hooks/Popover', module)
    .addDecorator(withFusionStory('Popover'))
    .addDecorator(withKnobs)
    .add('Default', () => {
        return <PopoverStory />;
    });
