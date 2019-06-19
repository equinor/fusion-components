import * as React from "react";
import { storiesOf } from "@storybook/react";
import TextInput from "./index";

const TextInputStory =() => {
    const [value, setValue] = React.useState("");
    return(
        <TextInput onChange={(value) =>setValue(value) } value={value}/>
    )
}

storiesOf("General|TextInput", module).add("Default", () => <TextInputStory />);