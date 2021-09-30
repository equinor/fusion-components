import { ErrorTypes } from '../../../../../general/ErrorMessage';

export type ErrrorProperties = {
    title?: string;
    message?: string;
    type?: ErrorTypes;
};

export { PowerBIReportErrorBoundary } from './PowerBIReportErrorBoundary';

export { default } from './PowerBIReportErrorBoundary';
