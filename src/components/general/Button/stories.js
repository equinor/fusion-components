import React from "react";
import { storiesOf } from "@storybook/react";
import { actions } from "@storybook/addon-actions";
import Button from "./";

const eventsFromNames = actions("onClick");

const createButtonStory = props => () => {
    return (
        <React.Fragment>
            <div style={{ padding: 8 }}>
                <Button primary small {...props} {...eventsFromNames}>Small button</Button>
                <Button primary {...props} {...eventsFromNames}>Medium button</Button>
                <Button primary large {...props} {...eventsFromNames}>Large button</Button>
                <Button primary disabled {...props} {...eventsFromNames}>Disabled button</Button>
            </div>
            <div style={{ padding: 8 }}>
                <Button signal small {...props} {...eventsFromNames}>Small button</Button>
                <Button signal {...props} {...eventsFromNames}>Medium button</Button>
                <Button signal large {...props} {...eventsFromNames}>Large button</Button>
                <Button signal disabled {...props} {...eventsFromNames}>Disabled button</Button>
            </div>
        </React.Fragment>
    );
};

storiesOf("General components/Button", module)
    .add("Contained", createButtonStory({ contained: true }))
    .add("Outlined", createButtonStory({ outlined: true }))
    .add("Frameless", createButtonStory({ frameless: true }));