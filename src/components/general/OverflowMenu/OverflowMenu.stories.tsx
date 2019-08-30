import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import withFusionStory from '../../../../.storybook/withFusionStory';
/* import OverFlowMenu from '../index'; */

storiesOf('General|Overflow menu', module)
    .addParameters({ jest: ['IconButton.stories.jsx'] })
    .addDecorator(withFusionStory('Overflow menu'))
    .add('Default', () => <div style={{ padding: 8 }} />);
