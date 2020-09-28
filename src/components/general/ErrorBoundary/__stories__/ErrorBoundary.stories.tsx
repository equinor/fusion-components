import * as React from "react";
import { storiesOf } from "@storybook/react";
import withFusionStory from "../../../../../.storybook/withFusionStory";
import ErrorBoundary from "../index";
import Button from "../../Button";

const BuggyDivider = () => {
    const [count, setCount] = React.useState(0);
    if (count === 5) {
        throw new Error("This component can't count to five");
    }

    return (
        <div
            style={{
                margin: "0 auto",
                textAlign: "center",
            }}
        >
            <span>Count to five: {count}</span>
            <br />
            <Button onClick={() => setCount(count + 1)}>Count!</Button>
        </div>
    );
};

const ErrorBoundaryStory = () => {
    return (
        <ErrorBoundary>
            <BuggyDivider />
        </ErrorBoundary>
    );
};

storiesOf('General/ErrorBoundary', module)
    .addParameters({ jest: ["ErrorBoundary.stories.tsx"] })
    .addDecorator(withFusionStory("ErrorBoundary"))
    .add("ErrorBoundary", () => <ErrorBoundaryStory />);
