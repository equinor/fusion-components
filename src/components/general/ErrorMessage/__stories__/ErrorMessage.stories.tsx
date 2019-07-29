import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import ErrorMessage, { ErrorTypes } from '../index';

const styles = {
    display: 'flex',
    height: '100%',
};

const ErrorMessageError = () => {
    return (
        <ErrorMessage
            message="Your error message describing how to resolve the problem"
            hasError
            errorType={ErrorTypes.error}
            action="Resolve the problem"
            onTakeAction={() => window.location.reload()}
        />
    );
};

const ErrorMessageNoData = () => {
    return (
        <ErrorMessage
            message="Your error message describing how to resolve the problem"
            hasError
            action="Resolve the problem"
            onTakeAction={() => window.location.reload()}
            errorType={ErrorTypes.noData}
        />
    );
};
const ErrorMessageNotFound = () => {
    return (
        <ErrorMessage
            message="Your error message describing how to resolve the problem"
            hasError
            errorType={ErrorTypes.notFound}
            resourceName="person"
        />
    );
};
const ErrorMessageNoAccess = () => {
    return (
        <ErrorMessage
            message="Your error message describing how to resolve the problem"
            hasError
            errorType={ErrorTypes.accessDenied}
            action="Resolve the problem"
        />
    );
};
storiesOf('General|ErrorMessage', module)
    .addParameters({ jest: ['ErrorMessage.stories.tsx'] })
    .addDecorator(withFusionStory('ErrorMessage'))
    .add('Error', () => <ErrorMessageError />)
    .add('NoData', () => <ErrorMessageNoData />)
    .add('NotFound', () => <ErrorMessageNotFound />)
    .add('NoAccess', () => <ErrorMessageNoAccess />);
