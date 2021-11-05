import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import { SkeletonBar, SkeletonButton, SkeletonDisc } from './index';
import { styling } from '@equinor/fusion-components';
import { DiscSize } from './Disc';

const sizes = {
    xlarge: 'xlarge',
    large: 'large',
    medium: 'medium',
    small: 'small',
};

const size = sizes.xlarge as DiscSize;

const stories = storiesOf('Feedback/Skeleton', module);
stories.addDecorator(withFusionStory('Skeleton'));

stories.add('Bar', () => (
    <>
        <div>
            <SkeletonBar />
        </div>
        <div>
            <SkeletonBar />
        </div>
        <div>
            <SkeletonBar />
        </div>
        <div>
            <SkeletonBar />
        </div>
    </>
));

stories.add('Button', () => (
    <>
        <div>
            <SkeletonButton width={styling.grid(10)} />
        </div>
        <div>
            <SkeletonButton width={styling.grid(10)} />
        </div>
        <div>
            <SkeletonButton width={styling.grid(10)} />
        </div>
        <div>
            <SkeletonButton width={styling.grid(10)} />
        </div>
    </>
));

stories.add('Disc', () => (
    <>
        <div>
            <SkeletonDisc size={size} />
        </div>
    </>
));
