import React from 'react';
import { storiesOf } from '@storybook/react';
import { Switch, CheckBox } from './index';

const SwitchStory = () => {
    const [active, setActive] = React.useState(false);
    return (
        <div style={{ padding: '8px' }}>
            <Switch active={active} onChange={() => setActive(!active)} />
            <Switch disabled />
        </div>
    );
};
const CheckboxStory = () => {
    const [selected, setSelected] = React.useState(false);

    return (
        <div style={{ padding: '8px' }}>
            <CheckBox selected={selected} onChange={() => setSelected(!selected)} />
            <CheckBox indeterminate />
            <CheckBox disabled />
            <CheckBox disabled selected={true} />
        </div>
    );
};

storiesOf('General|Selection Controls', module)
    .add('Switch', () => <SwitchStory />)
    .add('Checkbox', () => <CheckboxStory />);
