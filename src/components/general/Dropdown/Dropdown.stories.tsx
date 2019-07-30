import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Dropdown from "./index";

const DropdownStory = () => {
    return (
        <div style={{margin:"8px"}}>
            <Dropdown />
        </div>
    )
}

storiesOf('General|Dropdown', module)
    .add('Default', () => <DropdownStory />);
