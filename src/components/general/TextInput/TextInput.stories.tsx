import * as React from 'react';
import { storiesOf } from '@storybook/react';
import TextInput from './index';
import { WarningIcon } from '../../icons/components/alert';

const TextInputStory = () => {
    const [value, setValue] = React.useState('');
    return (
        <React.Fragment>
            <TextInput
                onChange={value => setValue(value)}
                value={value}
                label="Text Input"
                placeholder="Input text"
                isRequired
                disabled
            />
            <br />
            <TextInput
                error
                label="Error input"
                placeholder="Error"
                errorMessage="An error occured"
                onChange={value => setValue(value)}
                value={value}
                icon={<WarningIcon outline cursor="default" color="#FF3B3B" />}
            />
            <br />
            <TextInput onChange={value => setValue(value)} value={value} disabled/>
        </React.Fragment>
    );
};

storiesOf('General|TextInput', module).add('Default', () => <TextInputStory />);
