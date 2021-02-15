import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import Calendar from '../index';
import { styling } from '@equinor/fusion-components';
import { Month } from '@equinor/fusion';
import { storiesOf } from '@storybook/react';

const stories = storiesOf('General/Calendar', module);
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
