import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import DataTable from '../index';

const stories = storiesOf('Data|DataTable', module);
stories.addDecorator(withKnobs);

stories.add('Default', () => <DataTable test={text('Test', 'Test av knobs')} />);
