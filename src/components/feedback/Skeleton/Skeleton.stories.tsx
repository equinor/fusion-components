import React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';

import { SkeletonBar, SkeletonButton } from './index';
import { styling } from "@equinor/fusion-components";

const stories = storiesOf('Feedback|Skeleton', module);
stories.addDecorator(withFusionStory('Skeleton'));

stories.add('Bar', () => (
    <>
        <div><SkeletonBar /></div>
        <div><SkeletonBar /></div>
        <div><SkeletonBar /></div>
        <div><SkeletonBar /></div>
    </>
));

stories.add('Button', () => (
    <>
        <div><SkeletonButton /></div>
        <div><SkeletonButton width={styling.grid(1)} /></div>
        <div><SkeletonButton width={styling.grid(5)} /></div>
        <div><SkeletonButton width={styling.grid(2)} /></div>
    </>
));
