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
                action="Retry"
                onButtonClick={() => window.location.reload()}
            />
            <Splitter />
            <ErrorMessage
                message="An error occurred, please click the button below to retry"
                hasError
                errorType={ErrorTypes.error}
                action="Retry"
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
                action="Go to the direct data source"
                onButtonClick={() => window.location.reload()}
                errorType={ErrorTypes.noData}
            />
            <Splitter />
            <ErrorMessage
                message="Try go to the direct data source to check if the data is present"
                hasError
                action="Go to the direct data source"
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
                action="Request access"
            />
            <Splitter />
            <ErrorMessage
                message="Add a request to get access"
                hasError
                errorType={ErrorTypes.accessDenied}
                action="Request access"
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
