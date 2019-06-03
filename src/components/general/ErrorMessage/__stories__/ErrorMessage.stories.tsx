import * as React from "react";
import { storiesOf } from "@storybook/react";
import ErrorMessage from "../index";

const ErrorMessageStory = () =>{
    
    return(
        <ErrorMessage message="This the message for the Error Message" hasError/>
    )
}

storiesOf("General components/ErrorMessage", module)
    .addParameters({ jest: ["ErrorMessage.stories.tsx"] })
    .add("ErrorMessage", () => <ErrorMessageStory />);
