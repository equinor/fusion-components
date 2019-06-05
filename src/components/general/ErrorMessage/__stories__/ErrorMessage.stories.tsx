import * as React from "react";
import { storiesOf } from "@storybook/react";
import ErrorMessage, { ErrorTypes } from "../index";

const Splitter = () => {
    return (
        <div
            style={{
                border: "0.5px solid gray",
                margin: "40px auto 40px auto",
                width: "40%"
            }}
        />
    );
};

const ErrorMessageError = () => {
    return (
        <React.Fragment>
            <ErrorMessage
                message="Your error message describing how to resolve the problem"
                hasError
                errorType={ErrorTypes.error}
                action="Resolve the problem"
                onButtonClick={() => window.location.reload()}
            />
            <Splitter />
            <ErrorMessage
                message="Your error message describing how to resolve the problem"
                hasError
                errorType={ErrorTypes.error}
                action="Resolve the problem"
                onButtonClick={() => window.location.reload()}
                small
            />
        </React.Fragment>
    );
};

const ErrorMessageNoData = () => {
    return (
        <React.Fragment>
            <ErrorMessage
                message="Your error message describing how to resolve the problem"
                hasError
                action="Resolve the problem"
                onButtonClick={() => window.location.reload()}
                errorType={ErrorTypes.noData}
            />
            <Splitter />
            <ErrorMessage
                message="Your error message describing how to resolve the problem"
                hasError
                action="Resolve the problem"
                onButtonClick={() => window.location.reload()}
                errorType={ErrorTypes.noData}
                small
            />
        </React.Fragment>
    );
};
const ErrorMessageNotFound = () => {
    return (
        <React.Fragment>
            <ErrorMessage
                message="Your error message describing how to resolve the problem"
                hasError
                errorType={ErrorTypes.notFound}
                resourceName="person"
            />
            <Splitter />
            <ErrorMessage
                message="Your error message describing how to resolve the problem"
                hasError
                errorType={ErrorTypes.notFound}
                resourceName="person"
                small
            />
        </React.Fragment>
    );
};
const ErrorMessageNoAccess = () => {
    return (
        <React.Fragment>
            <ErrorMessage
                message="Your error message describing how to resolve the problem"
                hasError
                errorType={ErrorTypes.accessDenied}
                action="Resolve the problem"
            />
            <Splitter />
            <ErrorMessage
                message="Your error message describing how to resolve the problem"
                hasError
                errorType={ErrorTypes.accessDenied}
                action="Resolve the problem"
                small
            />
        </React.Fragment>
    );
};
storiesOf("General components/ErrorMessage", module)
    .addParameters({ jest: ["ErrorMessage.stories.tsx"] })
    .add("Error", () => <ErrorMessageError />)
    .add("NoData", () => <ErrorMessageNoData />)
    .add("NotFound", () => <ErrorMessageNotFound />)
    .add("NoAccess", () => <ErrorMessageNoAccess />);
