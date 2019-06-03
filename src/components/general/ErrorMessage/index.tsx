import * as React from "react";
import Button from "../Button";
import styles from "./styles.less";
import BanIcon from "./BanIcon";

export const errorTypes = {
    error: "error",
    accessDenied: "accessDenied",
    notFound: "notFound",
};

type ErrorMessageProps = {
    hasError?: boolean,
    onRetry?: (retries: number) => void,
    errorType?: "error" | "accessDenied" | "notFound",
    message?: any,
    maxRetries?: number,
    resourceName?: string,
    title?: string,
    children?: any,
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({
    hasError,
    onRetry,
    errorType = errorTypes.error,
    message,
    maxRetries = 5,
    resourceName,
    title,
    children,
}) => {
    const [retries, setRetries] = React.useState(0);

    const getErrorMessageForType = errorType => {
        switch (errorType) {
            case errorTypes.error:
                return "Oops! Something went wrong!";
            case errorTypes.accessDenied:
                return "No access!";
            case errorTypes.notFound:
                return `The ${resourceName} could not be found`;
        }
    };

    const retry = () => {
        if (retries >= maxRetries) {
            return;
        }

        setRetries(retries + 1);
        onRetry && onRetry(retries);
    };

    const renderRetries = React.useMemo(() => {
        if (errorType === errorTypes.error) {
            return (
                <div className={styles.actions}>
                    {retries < maxRetries && (
                        <Button primary contained onClick={retry}>
                            Retry
                        </Button>
                    )}
                    {retries >= maxRetries && (
                        <p>
                            This does not seem to be working right now. Please try again later or
                            register a support ticket
                        </p>
                    )}
                </div>
            );
        }
    }, [retries]);

    const isRetry = retries > 0;

    if (!hasError) {
        return children && children(isRetry);
    }

    return (
        <div className={styles.container}>
            {children && children(isRetry)}
            <div className={styles.messageContainer}>
                {errorType === errorTypes.accessDenied && <BanIcon />}
                <div className={styles.message}>
                    <p>{title || getErrorMessageForType(errorType)}</p>
                    {message}
                </div>
                {renderRetries}
            </div>
        </div>
    );
};

export default ErrorMessage;
