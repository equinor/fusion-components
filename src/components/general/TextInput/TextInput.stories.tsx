import * as React from 'react';
import { storiesOf } from '@storybook/react';
import TextInput from './index';
import { WarningIcon } from '../../icons/components/alert';
import { SearchIcon } from '../../icons/components/action';
import Spinner from '../../feedback/Spinner';

const TextInputStory = () => {
    const [value, setValue] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);

    const simulateLoad = () => {
        setLoading(true);
        setTimeout(() => {setLoading(false); setHasError(true)}, 3000);
    };

    return (
        <React.Fragment>
            <TextInput
                onChange={value => setValue(value)}
                value={value}
                label="Text Input"
                placeholder="Input text"
                isRequired
            />
            <br />
            <TextInput
                error
                label="Error input"
                placeholder="Error"
                errorMessage="An error occurred"
                onChange={value => setValue(value)}
                value={value}
                icon={<WarningIcon outline cursor="default" color="#FF3B3B" />}
            />
            <br />
            <TextInput
                onChange={value => setValue(value)}
                value={value}
                disabled
                label="Disabled"
                placeholder="Can't change me"
            />
            <br />
            <TextInput
                onChange={value => setValue(value)}
                value={value}
                placeholder="Search"
                icon={!loading ? <SearchIcon color="#666666" /> : <Spinner inline />}
                onIconAction={simulateLoad}
                error={hasError}
                errorMessage="Could not fetch data"
            />
            <br />
        </React.Fragment>
    );
};

storiesOf('General|TextInput', module).add('Default', () => <TextInputStory />);
