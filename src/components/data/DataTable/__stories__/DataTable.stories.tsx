import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, array } from '@storybook/addon-knobs';

import DataTable from '../index';

const stories = storiesOf('Data|DataTable', module);
stories.addDecorator(withKnobs);

stories.add('Default', () => (
    <DataTable
        id="test"
        rowKeyAccessor="test"
        renderListItem={() => console.log('renderListItem')}
        data={array('data', ['Ingen'])}
        onReset={() => console.log('resatt')}
        isFetching={boolean('isFetching', false)}
    />
));
