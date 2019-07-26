import * as React from 'react';
import Button from '../Button';
import styles from './styles.less';
import classNames from 'classnames';
import { BlockIcon, WarningIcon, SyncDisabledIcon } from '@equinor/fusion-components';
import { useComponentDisplayClassNames } from '@equinor/fusion';

export enum ErrorTypes {
    error = 'error',
    accessDenied = 'accessDenied',
    notFound = 'notFound',
    noData = 'noData',
}

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

const ErrorMessage: React.FC<ErrorMessageProps> = ({
    hasError,
    errorType = ErrorTypes.error,
    message,
    resourceName,
    title,
    children,
    icon,
    action,
    onTakeAction,
}) => {
    const getErrorMessageForType = errorType => {
        const iconProps = {
            width: 80,
            height: 80,
            cursor: 'default',
            color: '#666666',
        };

        switch (errorType) {
            case ErrorTypes.accessDenied:
                return {
                    title: 'It seems like you don´t have access to this content',
                    icon: <BlockIcon {...iconProps} />,
                };
            case ErrorTypes.notFound:
                return {
                    title: `The ${resourceName} could not be found`,
                    icon: <WarningIcon {...iconProps} outline />,
                };
            case ErrorTypes.noData:
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

    if (!hasError) {
        return children;
    }
    const error = React.useMemo(() => getErrorMessageForType(errorType), [errorType]);

    const messageContainerClasses = classNames(styles.messageContainer, useComponentDisplayClassNames(styles));

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

export default ErrorMessage;
