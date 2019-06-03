import * as React from "react";
import { storiesOf } from "@storybook/react";
import ErrorMessage from "../index";

const ErrorMessageStory = () =>{
    
    return(
        <ErrorMessage title="This the title for the Error Message" />
    )
}

storiesOf("General components/ErrorMessage", module)
    .addParameters({ jest: ["ErrorMessage.stories.tsx"] })
    .add("ErrorMessage", () => <ErrorMessageStory />);
