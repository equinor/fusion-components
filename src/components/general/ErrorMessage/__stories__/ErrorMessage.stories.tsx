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
                message="An error occurred, please click the button below to retry"
                hasError
                errorType={ErrorTypes.error}
                button="Retry"
                onButtonClick={() => window.location.reload()}
            />
            <Splitter />
            <ErrorMessage
                message="An error occurred, please click the button below to retry"
                hasError
                errorType={ErrorTypes.error}
                button="Retry"
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
                message="Try go to the direct data source to check if the data is present"
                hasError
                button="Go to the direct data source"
                onButtonClick={() => window.location.reload()}
                errorType={ErrorTypes.noData}
            />
            <Splitter />
            <ErrorMessage
                message="Try go to the direct data source to check if the data is present"
                hasError
                button="Go to the direct data source"
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
                message="Put in a request in Service Now to add the person"
                hasError
                errorType={ErrorTypes.notFound}
                resourceName="person"
            />
            <Splitter />
            <ErrorMessage
                message="Put in a request in Service Now to add the person"
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
                message="Add a request to get access"
                hasError
                errorType={ErrorTypes.accessDenied}
                button="Request access"
            />
            <Splitter />
            <ErrorMessage
                message="Add a request to get access"
                hasError
                errorType={ErrorTypes.accessDenied}
                button="Request access"
                small
            />
        </React.Fragment>
    );
};
const ErrorMessageNoFiles = () => {
    return (
        <React.Fragment>
            <ErrorMessage
                message="Try adding some attachments using the button below"
                hasError
                errorType={ErrorTypes.noAttachment}
                button="Add file"
            />
            <Splitter />
            <ErrorMessage
                message="Try adding some attachments using the button below"
                hasError
                errorType={ErrorTypes.noAttachment}
                button="Add file"
                small
            />
        </React.Fragment>
    );
};
const ErrorMessageNoActionsCreated = () => {
    return (
        <React.Fragment>
            <ErrorMessage
                message="Please click the button below to add a action"
                hasError
                errorType={ErrorTypes.noActionsCreated}
                button="Add action"
            />
            <Splitter />
            <ErrorMessage
                message="Please click the button below to add a action"
                hasError
                errorType={ErrorTypes.noActionsCreated}
                button="Add action"
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
    .add("NoAccess", () => <ErrorMessageNoAccess />)
    .add("noAttachment", () => <ErrorMessageNoFiles />)
    .add("NoActionsCreated", () => <ErrorMessageNoActionsCreated />);
