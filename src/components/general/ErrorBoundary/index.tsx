import { Component } from 'react';
import { ErrorMessage, ErrorMessageProps } from '../ErrorMessage';

export default class ErrorBoundary extends Component<
    ErrorMessageProps & { onError?: (err: unknown, info: any) => void }
> {
    static defaultProps = {
        errorType: 'error',
    };

    state = {
        hasError: false,
        error: null,
        errorInfo: null,
        errorMessage: '',
    };

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true,
            error,
            errorInfo,
            errorMessage: error.message || '',
        });
        this.props.onError?.(error, errorInfo);
    }

    getErrorMessage() {
        const { errorMessage } = this.state;
        const { message } = this.props;

        if (message) {
            return message;
        }
        if (errorMessage !== '') {
            return errorMessage;
        }

        return 'Unhandled error message';
    }

    takeAction = () => {
        if (this.state.hasError && this.props.onTakeAction) {
            return this.props.onTakeAction();
        }
        window.location.reload();
    };

    render() {
        const { hasError, errorType, children, action } = this.props;
        return (
            <ErrorMessage
                hasError={this.state.hasError || hasError}
                errorType={errorType || 'error'}
                message={this.getErrorMessage()}
                onTakeAction={this.takeAction}
                action={action || 'Retry'}
                {...this.props}
            >
                {children}
            </ErrorMessage>
        );
    }
}
