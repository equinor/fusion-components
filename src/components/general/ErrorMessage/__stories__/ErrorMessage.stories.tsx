import * as React from "react";
import { storiesOf } from "@storybook/react";
import ErrorMessage, { ErrorTypes } from "../index";


const styles = {
    display:"flex",
    width:"70%"
}
const ErrorMessageError = () => {
    return (
        <div style={styles}>
            <ErrorMessage
                message="Your error message describing how to resolve the problem"
                hasError
                errorType={ErrorTypes.error}
                action="Resolve the problem"
                onTakeAction={() => window.location.reload()}
            />
            <ErrorMessage
                message="Your error message describing how to resolve the problem"
                hasError
                errorType={ErrorTypes.error}
                action="Resolve the problem"
                onTakeAction={() => window.location.reload()}
                small
            />
        </div>
    );
};

const ErrorMessageNoData = () => {
    return (
        <div style={styles}>
            <ErrorMessage
                message="Your error message describing how to resolve the problem"
                hasError
                action="Resolve the problem"
                onTakeAction={() => window.location.reload()}
                errorType={ErrorTypes.noData}
            />
            <ErrorMessage
                message="Your error message describing how to resolve the problem"
                hasError
                action="Resolve the problem"
                onTakeAction={() => window.location.reload()}
                errorType={ErrorTypes.noData}
                small
            />
        </div>
    );
};
const ErrorMessageNotFound = () => {
    return (
        <div style={styles}>
            <ErrorMessage
                message="Your error message describing how to resolve the problem"
                hasError
                errorType={ErrorTypes.notFound}
                resourceName="person"
            />
            <ErrorMessage
                message="Your error message describing how to resolve the problem"
                hasError
                errorType={ErrorTypes.notFound}
                resourceName="person"
                small
            />
        </div>
    );
};
const ErrorMessageNoAccess = () => {
    return (
        <div style={styles}>
            <ErrorMessage
                message="Your error message describing how to resolve the problem"
                hasError
                errorType={ErrorTypes.accessDenied}
                action="Resolve the problem"
            />
            <ErrorMessage
                message="Your error message describing how to resolve the problem"
                hasError
                errorType={ErrorTypes.accessDenied}
                action="Resolve the problem"
                small
            />
        </div>
    );
};
storiesOf("General components/ErrorMessage", module)
    .addParameters({ jest: ["ErrorMessage.stories.tsx"] })
    .add("Error", () => <ErrorMessageError />)
    .add("NoData", () => <ErrorMessageNoData />)
    .add("NotFound", () => <ErrorMessageNotFound />)
    .add("NoAccess", () => <ErrorMessageNoAccess />);
