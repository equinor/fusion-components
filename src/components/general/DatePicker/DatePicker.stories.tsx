import * as React from 'react';
import { storiesOf } from '@storybook/react';
import DatePicker from './index';
import withFusionStory from '../../../../.storybook/withFusionStory';

const DatePickerStory = () => {
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

    return (
        <div style={{ width: 200 }}>
            <DatePicker label="Select date" selectedDate={selectedDate} onChange={setSelectedDate} />
            <br />
            <DatePicker label="Select date" selectedDate={selectedDate} onChange={setSelectedDate} error errorMessage="Select a date in the future" />
        </div>
    );
};

storiesOf('General|Date picker', module)
    .addDecorator(withFusionStory('Date picker'))
    .add('Default', () => <DatePickerStory />);
