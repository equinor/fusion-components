import { ErrorTypes } from '@equinor/fusion-components/dist/components/general/ErrorMessage';

export type ErrrorProperties = {
    title?: string;
    message?: string;
    type?: ErrorTypes;
};

export { PowerBIReportErrorBoundary } from './PowerBIReportErrorBoundary';

export { default } from './PowerBIReportErrorBoundary';
