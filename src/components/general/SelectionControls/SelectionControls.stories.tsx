import React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from "../../../../.storybook/withFusionStory";
import { Switch, CheckBox, RadioButton } from './index';

const SwitchStory = () => {
    const [active, setActive] = React.useState(false);
    return (
        <div style={{ padding: '8px' }}>
            <Switch active={active} onChange={() => setActive(!active)} />
            <Switch disabled />
            <Switch active disabled />
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

const RadioButtonStory = () => {
    const [active, setActive] = React.useState(false);
    return (
        <div style={{ padding: '8px' }}>
            <RadioButton selected={active} onChange={() => setActive(!active)} />
            <RadioButton disabled />
            <RadioButton disabled selected />
        </div>
    );
};
storiesOf('General|Selection Controls', module)
    .addDecorator(withFusionStory('Selection Controls'))
    .add('Switch', () => <SwitchStory />)
    .add('Checkbox', () => <CheckboxStory />)
    .add('Radio Button', () => <RadioButtonStory />);
