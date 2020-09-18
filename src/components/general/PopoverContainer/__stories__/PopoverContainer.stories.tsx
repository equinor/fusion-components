import * as React from 'react';
import { storiesOf } from '@storybook/react';
import PopoverContainer from '..';

const PopoverContainerStory = () => {
    return (
        <>
            <div style={{ position: 'absolute', top: '50px', left: '50px' }}>
                <PopoverContainer placement={'below'}>
                    <div>
                        <p>This is the PopOverContainer used in the popoverRef hook</p>
                        <p>
                            If you want popovers then the <b>popoverRef hook</b> is probably what
                            you are looking for.
                        </p>
                    </div>
                </PopoverContainer>
            </div>
            <div style={{ position: 'absolute', top: '200px', left: '230px' }}>
                <PopoverContainer placement={'right'}>
                    <div style={{ width: '200px' }}>
                        <p>
                            This is here if you need to implement a popover and a ref is really not
                            working for you.
                        </p>
                        <p>Using this component directly should be a last resort</p>
                    </div>
                </PopoverContainer>
            </div>
        </>
    );
};

storiesOf('General/Popover Container', module).add('Default', () => {
    return <PopoverContainerStory />;
});
