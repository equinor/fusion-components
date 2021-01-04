import { FusionApiErrorMessage } from '@equinor/fusion';
import { ErrorTypes } from 'src/components/general/ErrorMessage';

export type GardenDataErrorTypes = ErrorTypes | 'noCache' | 'NoDataAccess' | 'UnexpectedError';

export type GardenDataError = {
    errorType: GardenDataErrorTypes;
    errorResponse?: FusionApiErrorMessage | null;
};