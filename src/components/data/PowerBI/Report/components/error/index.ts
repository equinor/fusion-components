import { ErrorTypes } from '@equinor/fusion-components';

export type ErrrorProperties = {
  title?: string;
  message?: string;
  type?: ErrorTypes;
};

export { PowerBIReportErrorBoundry } from './PowerBIReportErrorBoundry';

export { default } from './PowerBIReportErrorBoundry';