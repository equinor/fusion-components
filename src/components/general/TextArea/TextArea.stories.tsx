import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import TextArea from './index';
import {
    useKeyboardNavigation,
    Spinner,
    SearchIcon,
    useStringMask,
    unmaskString,
} from '@equinor/fusion-components';
import { dateTimeMask, parseDateTime } from '@equinor/fusion';

const TextAreaStory = () => {
    const [value, setValue] = React.useState('');
    const [maskedValue, isValidMask] = useStringMask(dateTimeMask, value);
    const [loading, setLoading] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);
    const inputRef = React.useRef<HTMLTextAreaElement | null>(null);

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
            <TextArea
                onChange={value => setValue(value)}
                value={value}
                placeholder="Input text"
                label="Label"
                isOptional
                helperText="Helper text"
            />

            <br />
            <TextArea
                error
                label="Error label"
                placeholder="Input Text"
                errorMessage="An error occurred"
                onChange={value => setValue(value)}
                value={value}
            />

            <br />
            <TextArea onChange={value => setValue(value)} value={value} disabled label="Disabled" />
            <br />
            <TextArea
                onChange={value => setValue(value)}
                value={value}
                error={hasError}
                errorMessage="Error: At least 8 characters"
                ref={inputRef}
            />
        </div>
    );
};

storiesOf('General|TextArea', module)
    .addDecorator(withFusionStory('TextArea'))
    .add('Default', () => <TextAreaStory />);
