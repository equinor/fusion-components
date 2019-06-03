import * as React from "react";
import { storiesOf } from "@storybook/react";
import ErrorBoundary from "../index";

const ErrorBoundaryStory = () => {
    return (
        <ErrorBoundary >
            <div>This component failed :(</div>
        </ErrorBoundary>
    );
};

storiesOf("General components/ErrorBoundary", module)
    .addParameters({ jest: ["ErrorBoundary.stories.tsx"] })
    .add("ErrorBoundary", () => <ErrorBoundaryStory />);
