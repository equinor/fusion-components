import Button from '../Button';
import styles from './styles.less';
import classNames from 'classnames';
import { BlockIcon, WarningIcon, SyncDisabledIcon } from '@equinor/fusion-components';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import { Component, useMemo } from 'react';

export type ErrorTypes = 'error' | 'accessDenied' | 'notFound' | 'noData';

export type ErrorMessageProps = {
    hasError?: boolean;
    errorType?: ErrorTypes;
    message?: any;
    resourceName?: string;
    title?: string;
    children?: any;
    icon?: any;
    action?: string;
    onTakeAction?: (event?: React.SyntheticEvent<Element, Event>) => void;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
    hasError,
    errorType = 'error',
    message,
    resourceName,
    title,
    children,
    icon,
    action,
    onTakeAction,
}) => {
    const getErrorMessageForType = (errorType) => {
        const iconProps = {
            width: 80,
            height: 80,
            cursor: 'default',
            color: '#666666',
        };

        switch (errorType) {
            case 'accessDenied':
                return {
                    title: 'It seems like you don´t have access to this content',
                    icon: <BlockIcon {...iconProps} />,
                };
            case 'notFound':
                return {
                    title: `The ${resourceName} could not be found`,
                    icon: <WarningIcon {...iconProps} outline />,
                };
            case 'noData':
                return {
                    title: `Unfortunately, we could not find any data for this component`,
                    icon: <SyncDisabledIcon {...iconProps} />,
                };
            default:
                return {
                    title: 'Oops! Something went wrong!',
                    icon: <WarningIcon {...iconProps} outline />,
                };
        }
    };

    const error = useMemo(() => getErrorMessageForType(errorType), [errorType]);

    const messageContainerClasses = classNames(
        styles.messageContainer,
        useComponentDisplayClassNames(styles)
    );

    if (!hasError) {
        return children;
    }

    return (
        <div className={styles.container}>
            <div className={messageContainerClasses}>
                {icon || error.icon}
                <div className={styles.title}>{title || error.title}</div>
                <div className={styles.message}>{message}</div>
                {action ? (
                    <Button outlined contained onClick={onTakeAction}>
                        {action}
                    </Button>
                ) : null}
            </div>
        </div>
    );
};

class ErrorMessageBoundry extends Component<ErrorMessageProps> {
    state = { didCatch: false };
    render() {
        if (this.state.didCatch) {
            return (
                <div className={styles.container}>
                    <div className={styles.messageContainer}>
                        <div className={styles.title}>Something went wrong</div>
                        <div className={styles.message}>
                            Please try refresh browser, if problem persists, please contact support
                            through service now
                        </div>
                    </div>
                </div>
            );
        }
        return <ErrorMessage {...this.props}>{this.props.children}</ErrorMessage>;
    }
    componentDidCatch() {
        this.setState({ didCatch: true });
    }
}

export default ErrorMessageBoundry;
