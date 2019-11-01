import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import TextInput from './index';
import {
    useKeyboardNavigation,
    Spinner,
    SearchIcon,
    useStringMask,
    unmaskString,
} from '@equinor/fusion-components';
import { dateTimeMask, parseDateTime } from '@equinor/fusion';

const TextInputStory = () => {
    const [value, setValue] = React.useState('');
    const [maskedValue, isValidMask] = useStringMask(dateTimeMask, value);
    const [loading, setLoading] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const maskHelperText = React.useMemo(
        () => (isValidMask ? parseDateTime(maskedValue).toString() : ''),
        [maskedValue, isValidMask]
    );

    const simulateLoad = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            value.length <= 8 && setHasError(true);
        }, 3000);
    };

    React.useEffect(() => {
        if (hasError) {
            setHasError(false);
        }
    }, [value]);

    useKeyboardNavigation(
        {
            onEnter: () => simulateLoad(),
        },
        inputRef.current
    );

    return (
        <div style={{ display: 'flex', padding: '8px', flexDirection: 'column' }}>
            <TextInput
                onChange={value => setValue(value)}
                value={value}
                label="Text Input"
                isOptional
                helperText="Input text"
            />
            <br />
            <TextInput
                error
                label="Error input"
                errorMessage="An error occurred"
                onChange={value => setValue(value)}
                value={value}
            />
            <br />
            <TextInput
                onChange={value => setValue(value)}
                value={value}
                disabled
                label="Disabled"
            />
            <br />
            <TextInput
                onChange={value => setValue(value)}
                value={value}
                icon={
                    !loading ? (
                        <SearchIcon color="#666666" cursor="pointer" />
                    ) : (
                            <Spinner inline primary />
                        )
                }
                onIconAction={simulateLoad}
                error={hasError}
                errorMessage="Error: At least 8 characters"
                ref={inputRef}
            />
            <br />
            <TextInput
                onChange={value => setValue(unmaskString(dateTimeMask, value))}
                value={maskedValue}
                placeholder={'dd/mm/yyyy, hh:mm'}
                label="Masked text input"
                helperText={maskHelperText}
            />
        </div>
    );
};

storiesOf('General|TextInput', module)
    .addDecorator(withFusionStory('TextInput'))
    .add('Default', () => <TextInputStory />);
