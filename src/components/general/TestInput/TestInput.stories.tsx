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

const TestInputStory = () => {
    const [value, setValue] = React.useState('');
    const [maskedValue, isValidMask] = useStringMask(dateTimeMask, value);
    const [loading, setLoading] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
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

    const clickHandle = () => {};

    return (
        <div style={{ display: 'block', padding: '8px', flexDirection: 'column' }}>
            <TextInput onChange={value => setValue(value)} value={value} helperText=" ">
                <div>hei</div>
            </TextInput>
        </div>
    );
};

storiesOf('General|TestInput', module)
    .addDecorator(withFusionStory('TestInput'))
    .add('Default', () => <TestInputStory />);
