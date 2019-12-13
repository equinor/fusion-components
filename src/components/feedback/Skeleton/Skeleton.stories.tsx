import React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';

import { SkeletonBar, SkeletonButton, SkeletonDisc } from './index';
import { styling } from '@equinor/fusion-components';

const stories = storiesOf('Feedback|Skeleton', module);
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
            <SkeletonDisc width={styling.grid(7)} height={styling.grid(7)} />
        </div>
        <div>
            <SkeletonDisc width={styling.grid(6)} height={styling.grid(6)} />
        </div>
        <div>
            <SkeletonDisc width={styling.grid(5)} height={styling.grid(5)} />
        </div>
        <div>
            <SkeletonDisc width={styling.grid(4)} height={styling.grid(4)} />
        </div>
    </>
));
