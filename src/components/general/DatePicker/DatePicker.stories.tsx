import { storiesOf } from '@storybook/react';
import * as React from 'react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import DatePicker from './index';

const DatePickerStory = () => {
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
    const scope = 'storybook';
    return (
        <div style={{ width: 200 }}>
            <DatePicker
                id="date-picker-1"
                label="Select date"
                onChange={setSelectedDate}
                selectedDate={selectedDate}
                quickFactScope={scope}
            />
            <br />
            <DatePicker
                id="date-picker-2"
                error
                errorMessage="Select a date in the future"
                label="Select date"
                onChange={setSelectedDate}
                selectedDate={selectedDate}
                quickFactScope={scope}
            />
            <br />
            <DatePicker
                id="date-picker-3"
                disabled
                label="Select date"
                onChange={setSelectedDate}
                selectedDate={selectedDate}
                quickFactScope={scope}
            />
        </div>
    );
};

storiesOf('General|Date picker', module)
    .addDecorator(withFusionStory('Date picker'))
    .add('Default', () => <DatePickerStory />);
