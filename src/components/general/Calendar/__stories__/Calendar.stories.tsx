import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';

import Calendar from '../index';
import { Month } from '@equinor/fusion';
import styling from 'styles/styling';

const stories = storiesOf('General|Calendar', module);
stories.addDecorator(withFusionStory('Calendar'));

const initialYear = new Date().getFullYear();
const initialMonth = new Date().getMonth() as Month;

stories.add('Default', () => (
    <div style={{ width: styling.grid(7 * 6), margin: '0 auto' }}>
        <Calendar initialYear={initialYear} initialMonth={initialMonth} />
    </div>
));

const InteractiveCalendar = () => {
    const [selectedDate, setSelecteDate] = useState<Date>();
    return (
        <div style={{ width: styling.grid(7 * 6), margin: '0 auto' }}>
            <Calendar
                initialYear={initialYear}
                initialMonth={initialMonth}
                interactive
                onChange={setSelecteDate}
                selectedDate={selectedDate}
            />
        </div>
    );
};

stories.add('Interactive', () => <InteractiveCalendar />);
