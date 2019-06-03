import * as React from "react";
import ErrorMessage, { errorTypes } from "../ErrorMessage";
import PropTypes from "prop-types";

type ErrorBoundaryProps = {
    hasError?: boolean,
    onRetry?: (retries: number) => void,
    errorType: "error" | "accessDenied" | "notFound",
    message?: string,
    maxRetries?: number,
};
export default class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
    static propTypes = {
        hasError: PropTypes.bool,
        onRetry: PropTypes.func,
        errorType: PropTypes.oneOf(Object.values(errorTypes)),
        message: PropTypes.node,
        maxRetries: PropTypes.number,
    };
    static defaultProps = {
        errorType: errorTypes.error
      }

    state = {
        hasError: false,
    };

    componentDidCatch() {
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

    onRetry(retries) {
        const { onRetry } = this.props;

        if(this.state.hasError) {
            return window.location.reload();
        } else if(onRetry) {
            onRetry(retries);
        }
    }

    render() {
        const { hasError, errorType, maxRetries } = this.props;

        return (
            <ErrorMessage
                hasError={this.state.hasError || hasError}
                errorType={errorType || errorTypes.error}
                message={this.getErrorMessage()}
                onRetry={retries => this.onRetry(retries)}
                maxRetries={maxRetries}
            >
                {() => this.renderChildren()}
            </ErrorMessage>
        );
    }
}