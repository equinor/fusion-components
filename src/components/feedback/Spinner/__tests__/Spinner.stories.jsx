import React from "react";
import { storiesOf } from "@storybook/react";
import Spinner from "..";

storiesOf("Feedback components/Spinner", module)
    .addParameters({ jest: ["Spinner.stories.jsx"] })
    .add("Default", () => (
        <React.Fragment>
            <Spinner />
            <Spinner primary />
            <Spinner small />
            <p>
                Inline spinner <Spinner inline />
            </p>
        </React.Fragment>
    ));
