import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, color, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import withFusionStory from '../../../../.storybook/withFusionStory';
import Pagination from './index';
import { createPagination, Page } from '@equinor/fusion';

const onChangeAction = action('onChange');

const stories = storiesOf('General|Pagination', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withFusionStory('Pagination'));

const PaginationStory = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const onChange = (newPage: Page, perPage: number) => {
        onChangeAction(newPage, perPage);
        setCurrentPage(newPage.index);
    }

    return <Pagination pagination={createPagination(number('items', 100), number('per page', 10), currentPage, number('padding', 3))} onChange={onChange} />;
};

stories.add('Default', () => (
    <PaginationStory />
));
