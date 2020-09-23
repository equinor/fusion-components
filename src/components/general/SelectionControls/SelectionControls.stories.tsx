import React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import { Switch, CheckBox, RadioButton } from './index';

const SwitchStory = () => {
    const [active, setActive] = React.useState(false);
    const scope = 'storybook';
    return (
        <div style={{ padding: '8px' }}>
            <Switch
                active={active}
                onChange={() => setActive(!active)}
                id="1"
                quickFactScope={scope}
            />
            <Switch disabled id="2" quickFactScope={scope} />
            <Switch active disabled id="3" quickFactScope={scope} />
        </div>
    );
};
const CheckboxStory = () => {
    const [selected, setSelected] = React.useState(false);
    const scope = 'storybook';
    return (
        <div style={{ padding: '8px' }}>
            <CheckBox
                selected={selected}
                onChange={() => setSelected(!selected)}
                quickFactScope={scope}
                id="1"
            />
            <CheckBox indeterminate quickFactScope={scope} id="2" />
            <CheckBox disabled quickFactScope={scope} id="3" />
            <CheckBox disabled selected={true} quickFactScope={scope} id="4" />
        </div>
    );
};

const RadioButtonStory = () => {
    const [active, setActive] = React.useState(false);
    const scope = 'storybook';
    return (
        <div style={{ padding: '8px' }}>
            <RadioButton selected={active} onChange={() => setActive(!active)} id="1" />
            <RadioButton disabled id="2" />
            <RadioButton disabled selected id="3" />
        </div>
    );
};
storiesOf('General|Selection Controls', module)
    .addDecorator(withFusionStory('Selection Controls'))
    .add('Switch', () => <SwitchStory />)
    .add('Checkbox', () => <CheckboxStory />)
    .add('Radio Button', () => <RadioButtonStory />);
