import * as React from 'react';
import { storiesOf } from '@storybook/react';
import DatePicker from './index';
import withFusionStory from '../../../../.storybook/withFusionStory';
import { formatDate } from '@equinor/fusion';

const DatePickerStory = () => {
    const [selectedDate, setSelecteDate] = React.useState<Date | null>(null);

    return (
        <div style={{ width: 200 }}>
            <DatePicker selectedDate={selectedDate} onChange={setSelecteDate} />
            Selected date: {selectedDate ? formatDate(selectedDate) : null}
        </div>
    );
};

storiesOf('General|Date picker', module)
    .addDecorator(withFusionStory('Date picker'))
    .add('Default', () => <DatePickerStory />);
