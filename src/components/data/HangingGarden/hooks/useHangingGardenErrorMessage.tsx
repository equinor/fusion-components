import { useCallback, useEffect, useState } from 'react';
import { ErrorMessageProps } from 'src/components/general/ErrorMessage';
import { GardenDataError } from '../models/GardenDataError';

/**
 * Consumes a GardenDataError object to create an errorMessage.
 * Work well in combination with errors from useHangingGardenData hooks
 *
 * @param resourceName Represents the resourceName in errorMessages. Will be used in some of the error messages.
 * @param error The error that has occured when fetching data for the Garden.
 * @param onTakeAction Supply a function that will be attached to the retry button in error message.
 * @returns An ErrorMessageProps object is returned and can be directly feed to errorMessage component.
 * @example  const {error,retry,} = useHangingGardenData('dataProxy','getHandoverAsync',
 *       applyToFetchedData,
 *       setItemSearchableValues
 *   );
 *   const { errorMessage } = useHangingGardenErrorMessage('handover', error, retry);
 *   return(<ErrorMessage {...errorMessage}>{children}</ErrorMessage>)
 */
const useHangingGardenErrorMessage = (
    resourceName: string,
    error: GardenDataError | null,
    onTakeAction: () => void
) => {
    const [errorMessage, setErrorMessage] = useState<ErrorMessageProps | null>(null);

    const buildErrorMessage = useCallback(
        (error: GardenDataError | null): ErrorMessageProps => {
            if (!error) return { hasError: false };

            switch (error?.errorType) {
                case 'noData':
                    return {
                        hasError: true,
                        errorType: 'noData',
                        message: `No ${resourceName} packages found for selected project`,
                        resourceName: resourceName,
                        action: 'Retry',
                        onTakeAction: onTakeAction,
                    };

                case 'noCache':
                    return {
                        hasError: true,
                        errorType: 'noData',
                        title: `Populating ${resourceName} dataset for project on the server`,
                        message: 'Please try again in a few minutes.',
                        resourceName: resourceName,
                        action: 'Retry',
                        onTakeAction: onTakeAction,
                    };
                case 'NoDataAccess':
                    return {
                        hasError: true,
                        errorType: 'accessDenied',
                        title: 'It looks like you do not have access to the selected context',
                        message: error?.errorResponse?.message,
                        resourceName: resourceName,
                    };
                case 'UnexpectedError':
                    if (error?.errorResponse?.message.includes('Unable to resolve context'))
                        return {
                            hasError: true,
                            errorType: 'noData',
                            title: 'Unable to find any related projects to selected context. ',
                            message: error?.errorResponse?.message,
                        };
                default:
                    return {
                        hasError: true,
                        errorType: 'error',
                        message: error?.errorResponse?.message,
                        action: 'Retry',
                        onTakeAction: onTakeAction,
                    };
            }
        },
        [resourceName, onTakeAction]
    );

    useEffect(() => {
        setErrorMessage(buildErrorMessage(error));
    }, [error]);

    return { errorMessage };
};

export default useHangingGardenErrorMessage;
