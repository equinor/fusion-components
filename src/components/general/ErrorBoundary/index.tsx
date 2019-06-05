import * as React from "react";
import ErrorMessage, { ErrorMessageProps, ErrorTypes } from "../ErrorMessage";

export default class ErrorBoundary extends React.Component<ErrorMessageProps> {
    static defaultProps = {
        errorType: ErrorTypes.error,
    };

    state = {
        hasError: false,
        error: null,
        errorInfo: null,
        errorMessage: "",
    };

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true,
            error,
            errorInfo,
            errorMessage: error.message || ""
        });
    }

    getErrorMessage() {
        const { errorMessage } = this.state;
        const { message } = this.props;

        if (message) {
            return message;
        }
        if (errorMessage !== "") {
            return errorMessage;
        }

        return "Unhandled error message";
    }

    renderChildren() {
        if (this.state.hasError) {
            return null;
        }

        return this.props.children;
    }

    onButtonClick() {
        if (this.state.hasError) {
            if (this.props.onButtonClick) {
                return this.props.onButtonClick();
            }
            return window.location.reload();
        }
    }

    render() {
        const { hasError, errorType, children, action } = this.props;
        return (
            <ErrorMessage
                hasError={this.state.hasError || hasError}
                errorType={errorType || ErrorTypes.error}
                message={this.getErrorMessage()}
                onButtonClick={() => this.onButtonClick()}
                action={action || "Retry"}
                {...this.props}
            >
                {children}
            </ErrorMessage>
        );
    }
}
