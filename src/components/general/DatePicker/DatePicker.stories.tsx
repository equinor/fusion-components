import { storiesOf } from '@storybook/react';
import * as React from 'react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import DatePicker from './index';

const DatePickerStory = () => {
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

    return (
        <div style={{ width: 200 }}>
            <DatePicker label="Select date" onChange={setSelectedDate} selectedDate={selectedDate} />
            <br />
            <DatePicker error errorMessage="Select a date in the future" label="Select date" onChange={setSelectedDate} selectedDate={selectedDate} />
            <br />
            <DatePicker disabled label="Select date" onChange={setSelectedDate} selectedDate={selectedDate} />
        </div>
    );
};

storiesOf('General|Date picker', module)
    .addDecorator(withFusionStory('Date picker'))
    .add('Default', () => <DatePickerStory />);
