import React from "react";
import { storiesOf } from "@storybook/react";
import Spinner from "../";

storiesOf("Feedback components/Spinner", module)
    .addParameters({
        jest: [ "Spinner.stories" ],

        // The spinner is animated and hard to do visual testing (screenshot comparison) on
        includeVisualTesting: false,
    })
    .add("Default", () => (
        <React.Fragment>
            <Spinner />
            <Spinner primary />
            <Spinner small />
            <p>Inline spinner <Spinner inline /></p>
        </React.Fragment>
    ));