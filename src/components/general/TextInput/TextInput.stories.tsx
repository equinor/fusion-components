import * as React from "react";
import { storiesOf } from "@storybook/react";
import TextInput from "./index";

const TextInputStory =() => {
    const [value, setValue] = React.useState("");
    return(
        <React.Fragment>
        <TextInput onChange={value =>setValue(value) } value={value} label="Text Input" placeholder="Input text"/>
        <br />
        <TextInput error label="Error input" placeholder="Error" onChange={value =>setValue(value) } value={value} />
        </React.Fragment>
        
    )
}

storiesOf("General|TextInput", module).add("Default", () => <TextInputStory />);