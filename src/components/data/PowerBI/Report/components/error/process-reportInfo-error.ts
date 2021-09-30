import { FusionApiHttpErrorResponse } from '@equinor/fusion';
import { ApiError } from '../../store/actions';

type ReportInfoHeadersType = { header: string; subHeader: string };

export const processReportInfoError = (error: ApiError): ReportInfoHeadersType | undefined => {
    if (error.error.message === 'NotAuthorizedReport')
        return {
            header: 'Restricted Access',
            subHeader: 'It looks like you do not have access to this report',
        };

    if ((error.error.response as FusionApiHttpErrorResponse).error.code === 'NotAuthorized')
        return {
            header: 'Restricted Access',
            subHeader: 'It looks like you do not have access to the selected context',
        };

    if (
        (error.error.response as FusionApiHttpErrorResponse).error.code === 'MissingContextRelation'
    )
        return {
            header: 'No Context Data',
            subHeader: 'No data available for selected context',
        };
};

export default processReportInfoError;
