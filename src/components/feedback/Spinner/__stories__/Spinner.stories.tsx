import { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import Spinner from '../index';

storiesOf('Feedback/Spinner', module)
    .addParameters({ jest: ['Spinner.stories.jsx'] })
    .addDecorator(withFusionStory('Spinner'))
    .add('Default', () => (
        <Fragment>
            <Spinner />
            <Spinner primary />
            <Spinner small />
            <p>
                Inline spinner <Spinner inline />
            </p>
        </Fragment>
    ));
