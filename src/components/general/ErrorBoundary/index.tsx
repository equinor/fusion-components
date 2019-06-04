import * as React from "react";
import ErrorMessage, { ErrorTypes } from "../ErrorMessage";
import PropTypes from "prop-types";

type ErrorBoundaryProps = {
    hasError?: boolean,
    errorType: ErrorTypes,
    message?: string,
};

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
    static propTypes = {
        hasError: PropTypes.bool,
        onRetry: PropTypes.func,
        errorType: PropTypes.oneOf(Object.values(ErrorTypes)),
        message: PropTypes.node,
        maxRetries: PropTypes.number,
    };
    static defaultProps = {
        errorType: ErrorTypes.error
      }

    state = {
        hasError: false,
        retries: 0,
    };

    componentDidCatch(error, errorInfo) {

        this.setState({ hasError: true });

    }

    getErrorMessage() {
        if(this.state.hasError) {
            return "Unhandled error message"; // TODO
        }

        return this.props.message;
    }

    renderChildren() {
        if(this.state.hasError) {
            return null;
        }

        return this.props.children;
    }

    onRetry() {

        if(this.state.hasError) {
            return window.location.reload();
        } 
    }

    render() {
        const { hasError, errorType, children } = this.props;
        return (
            <ErrorMessage
                hasError={this.state.hasError || hasError}
                errorType={errorType || ErrorTypes.error}
                message={this.getErrorMessage()}
                onButtonClick={() => this.onRetry()}
                button="Retry"
            >
                {children}
            </ErrorMessage>
        );
    }
}