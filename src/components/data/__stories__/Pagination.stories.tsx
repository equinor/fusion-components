import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, number, select } from '@storybook/addon-knobs';

import Pagination from '../pagination';

const perPageOptions = {
    5: '5',
    10: '10',
    20: '20',
    50: '50',
    100: '100',
};

const stories = storiesOf('Data|Pagination', module);
stories.addDecorator(withKnobs);

stories.add('Default', () => (
    <Pagination
        perPage={select('perPage', perPageOptions, '20')}
        currentPageIndex={number('currentPageIndex', 0)}
        totalCount={number('totalCount', 100)}
        onChange={action('onChange')}
    />
));
