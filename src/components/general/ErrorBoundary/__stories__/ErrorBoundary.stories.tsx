import * as React from "react";
import { storiesOf } from "@storybook/react";
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
                position: "relative",
                left: "50%",
                transform: "translateX(-50%)",
                width: "10%",
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

storiesOf("Feedback|ErrorBoundary", module)
    .addParameters({ jest: ["ErrorBoundary.stories.tsx"] })
    .add("ErrorBoundary", () => <ErrorBoundaryStory />);
