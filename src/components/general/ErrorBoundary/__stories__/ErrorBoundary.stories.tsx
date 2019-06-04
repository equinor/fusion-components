import * as React from "react";
import { storiesOf } from "@storybook/react";
import ErrorBoundary from "../index";
import Button from "../../Button";

const BuggyDivider = () => {
    const [count, setCount] = React.useState(5);
    if(count === 0){
        throw new Error("Cant divide by zero!")

    }   
    
    return (
        <React.Fragment>
            <span>What is 100 divided by {count -1} ?</span>
            <Button
                onClick={() => setCount(count -1)}
            >
                Lets find out
            </Button>
        </React.Fragment>
    );
};

const ErrorBoundaryStory = () => {
    return (
        <ErrorBoundary>
            <BuggyDivider />
        </ErrorBoundary>
    );
};

storiesOf("General components/ErrorBoundary", module)
    .addParameters({ jest: ["ErrorBoundary.stories.tsx"] })
    .add("ErrorBoundary", () => <ErrorBoundaryStory />);
